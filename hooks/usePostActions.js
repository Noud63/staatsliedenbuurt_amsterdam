import { mutate } from "swr";

import { revalidatePostCaches } from "@/utils/revalidatePost";
import { revalidateNotificationsCaches } from "@/utils/revalidatePost";
import { POSTS_ENDPOINTS, matchPostCacheKeys } from "@/lib/posts";

//Mutate all caches that contain the post (feed, posts by user id, single post) with the same optimistic update function
export const mutatePostCaches = (postId, updater) => {
  mutate(
    matchPostCacheKeys(postId),
    updater,
    {
      revalidate: false,
      rollbackOnError: true,
    },
  );
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

    // Optimistic update
    mutatePostCaches(postId, (data) => {
      // If it's an array (feed)
      if (Array.isArray(data)) {
        return data.map((p) =>
          p._id === postId
            ? {
                ...p,
                likesCount: p.likesCount + (p.likedByUser ? -1 : 1),
                likedByUser: !p.likedByUser,
              }
            : p,
        );
      }

      // If it's a single post
      if (data?._id === postId) {
        return {
          ...data,
          likesCount: data.likesCount + (data.likedByUser ? -1 : 1),
          likedByUser: !data.likedByUser,
        };
      }

      return data;
    });

    await fetch(POSTS_ENDPOINTS.like(postId), {
      method: "POST",
    });
  };

  // ---------------------------------------------------------------------
  // --------------------------- DELETE POST -----------------------------
  // ---------------------------------------------------------------------

  const deletePost = async (postId) => {
    mutatePostCaches(postId, (data) => {
      // If it's an array (feed)
      if (Array.isArray(data)) {
        return data.filter((p) => p._id !== postId);
      }
      // If it's a single post
      if (data?._id === postId) {
        return null; // or you could return a placeholder indicating it's deleted
      }
      return data;
    });

    mutateNotificationsCaches((data) => {
      //data = {"notifications": [{},{},...]} = whole object
      // Use whole object not only data.notifications to update cache
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

    mutatePostCaches(postId, (data) => {
      if (!data) return data;
      // If it's an array (feed)
      if (Array.isArray(data)) {
        return data.map((p) => {
          if (p._id !== postId) return p;

          return {
            ...p,
            comments: p.comments.map((comment) =>
              comment._id === commentId // target only the comment being liked
                ? {
                    ...comment,
                    likesCount:
                      comment.likesCount + (comment.likedByUser ? -1 : 1),
                    likedByUser: !comment.likedByUser,
                  }
                : comment,
            ),
          };
        });
        // If it's a single post
      } else if (data._id === postId) {
        return {
          ...data,
          comments: data.comments.map((comment) =>
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
      }
      return data;
    });
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
    mutatePostCaches(postId, (data) => {
      if (!data) return data;
      // If it's an array (feed)
      if (Array.isArray(data)) {
        return data.map((p) => {
          if (p._id === postId) {
            return {
              ...p,
              comments: p.comments.filter(
                (comment) => comment._id !== commentId,
              ),
            };
          }
          return p;
        });
      } else if (data._id === postId) {
        return {
          ...data,
          comments: data.comments.filter((comment) => comment._id !== commentId)
        };
      }
      return data;
    });

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

    mutatePostCaches(postId, (data) => {
      if (!data) return data;
      console.log("Data is:", data);
      // FEED CACHE (array)
      if (Array.isArray(data)) {
        return data.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            comments: [
              ...(post.comments || []),
              {
                ...tempComment,
              },
            ],
          };
        });
      }

      // SINGLE POST CACHE
      if (data._id === postId) {
        return {
          ...data,
          comments: [...(data.comments || []), tempComment],
        };
      }

      return data;
    });

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

    // Optimistic UI update
    mutatePostCaches(postId, (data) => {
      if (!data) return data;
      // FEED CACHE (array)
      if (Array.isArray(data)) {
        return data.map((post) => {
          if (post._id !== postId) return post;
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id !== commentId) return comment;
              return { ...comment, comment: newContent };
            }),
          };
        });
      }

      // SINGLE POST CACHE
      if (data._id === postId) {
        return {
          ...data,
          comments: data.comments.map((comment) => {
            if (comment._id !== commentId) return comment;
            return { ...comment, comment: newContent };
          }),
        };
      }

      return data;
    });

    try {
      // ✅ Send FormData directly (do NOT set Content-Type manually!)
      const res = await fetch(`/api/editComment/${commentId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to edit comment");

      // ✅ Revalidate after success
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

