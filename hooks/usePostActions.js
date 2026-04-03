import { mutate } from "swr";

import { revalidatePostCaches } from "@/utils/revalidatePost";
import { revalidateNotificationsCaches } from "@/utils/revalidatePost";
import {
  POSTS_ENDPOINTS,
  FEED_CACHE_KEY,
  getByUserCacheKey,
  updatePostsInCache,
  filterPostsInCache,
} from "@/lib/posts";

const MUTATE_OPTS = { revalidate: false, rollbackOnError: true };

//Mutate all caches that contain the post (feed, posts by user id, single post) with the same optimistic update function
export const mutatePostCaches = (postId, userId, updater) => {
  // 1. Feed (exact serialized infinite key)
  mutate(FEED_CACHE_KEY, updater, MUTATE_OPTS);
  // 2. byUser paginated cache (exact serialized infinite key)
  if (userId) mutate(getByUserCacheKey(userId), updater, MUTATE_OPTS);
  // 3. Single post page
  mutate(POSTS_ENDPOINTS.single(postId), updater, MUTATE_OPTS);
};

export const mutateNotificationsCaches = (updater) => {
  mutate(
    (key) => typeof key === "string" && key === "/api/getNotifications",
    updater,
    {
      revalidate: false,
      rollbackOnError: true,
    },
  );
};

// usePostActions hook to handle all optimistic updates for posts and comments
export function usePostActions() {
  const getPostId = (post) => post._id;

  // ------------------------------------------------------------------------
  // ------------------------------ LIKE POST -------------------------------
  // ------------------------------------------------------------------------

  const likePost = async (post) => {
    const postId = getPostId(post);

    mutatePostCaches(postId, post.userId, (data) =>
      updatePostsInCache(data, (p) =>
        p._id === postId
          ? {
              ...p,
              likesCount: p.likesCount + (p.likedByUser ? -1 : 1),
              likedByUser: !p.likedByUser,
            }
          : p,
      ),
    );

    await fetch(POSTS_ENDPOINTS.like(postId), {
      method: "POST",
    });
  };

  // ---------------------------------------------------------------------
  // --------------------------- DELETE POST -----------------------------
  // ---------------------------------------------------------------------

  const deletePost = async (postId, userId) => {
    mutatePostCaches(postId, userId, (data) =>
      filterPostsInCache(data, (p) => p._id !== postId),
    );

    mutateNotificationsCaches((data) => {
      if (!data) return data;
      return {
        ...data,
        notifications: data.notifications.filter(
          (notification) => notification.postId?.toString() !== postId,
        ),
      };
    });

    await fetch(`/api/deletepost/${postId}`, {
      method: "DELETE",
    });
  };

  // ---------------------------------------------------------------------
  // --------------------------- LIKE COMMENT ----------------------------
  // ---------------------------------------------------------------------

  const likeComment = async (commentId, post) => {
    const postId = getPostId(post);

    mutatePostCaches(postId, post.userId, (data) =>
      updatePostsInCache(data, (p) => {
        if (p._id !== postId) return p;
        return {
          ...p,
          comments: p.comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likesCount:
                    comment.likesCount + (comment.likedByUser ? -1 : 1),
                  likedByUser: !comment.likedByUser,
                }
              : comment,
          ),
        };
      }),
    );

    const res = await fetch(`/api/comments/${commentId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, postId }),
    });

    if (!res.ok) throw new Error("Failed to like comment");
  };

  // ---------------------------------------------------------------------
  // --------------------------- DELETE COMMENT --------------------------
  // ---------------------------------------------------------------------

  const deleteComment = async (commentId, post) => {
    const postId = getPostId(post);

    mutatePostCaches(postId, post.userId, (data) =>
      updatePostsInCache(data, (p) => {
        if (p._id !== postId) return p;
        return {
          ...p,
          comments: p.comments.filter((comment) => comment._id !== commentId),
        };
      }),
    );

    mutateNotificationsCaches((data) => {
      if (!data) return data;
      return {
        ...data,
        notifications: data.notifications.filter(
          (note) => note.comment?._id?.toString() !== commentId,
        ),
      };
    });

    const res = await fetch(`/api/deleteComment/${commentId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete comment");

    // Revalidate notifications to catch any nested comment notifications deleted on server
    await revalidateNotificationsCaches();
  };

  // ---------------------------------------------------------------------
  // --------------------------- ADD COMMENT -----------------------------
  // ---------------------------------------------------------------------

  const addComment = async (post, postId, tempComment) => {
    if (!post || !postId) return;

    mutatePostCaches(postId, post.userId, (data) =>
      updatePostsInCache(data, (p) => {
        if (p._id !== postId) return p;
        return {
          ...p,
          comments: [...(p.comments || []), { ...tempComment }],
        };
      }),
    );

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempComment),
      });

      if (!res.ok) throw new Error("Failed to add comment");
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      revalidatePostCaches(postId, post.userId);
    }
  };

  // ---------------------------------------------------------------------
  // -------------------------- EDIT COMMENT -----------------------------
  // ---------------------------------------------------------------------

  const editComment = async (commentId, post, formData, newContent) => {
    const postId = post._id;

    mutatePostCaches(postId, post.userId, (data) =>
      updatePostsInCache(data, (p) => {
        if (p._id !== postId) return p;
        return {
          ...p,
          comments: p.comments.map((comment) => {
            if (comment._id !== commentId) return comment;
            return { ...comment, comment: newContent };
          }),
        };
      }),
    );

    try {
      const res = await fetch(`/api/editComment/${commentId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to edit comment");

      await revalidatePostCaches(postId, post.userId);
    } catch (err) {
      console.error("Edit comment failed:", err);
    }
  };

  return {
    likePost,
    likeComment,
    addComment,
    deleteComment,
    deletePost,
    editComment,
  };
}
