"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import PostCommentForm from "./PostCommentForm";
import { useSession } from "next-auth/react";
import Comment from "./Comment";
import { useTranslations } from "next-intl";

const INITIAL_VISIBLE_COMMENTS = 3;

const PostComment = ({ post, onLikeComment, onDeleteComment }) => {
  const { data: session } = useSession();
  const profilePic = session?.user?.avatar;
  const t = useTranslations("reactie");
  const [showForm, setShowForm] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const allComments = post.comments || [];

  //Group comments by parentId ( null or comment._id) for efficient lookup
  const commentsByParent = useMemo(() => {
    const groupedComments = new Map();

    for (const comment of allComments) {
      const key = comment.parentId === null ? null : String(comment.parentId);
      // console.log("Key for comment", comment._id, "is", key);
      const existingComments = groupedComments.get(key) || [];
      // console.log("Existing comments for key:", existingComments);
      existingComments.push(comment);
      groupedComments.set(key, existingComments);
    }
    return groupedComments;
  }, [allComments]);

  //Get top-level comments from commentsByParent by key = null
  const topLevelComments = commentsByParent.get(null) || [];

  const visibleTopLevelComments = showAllComments
    ? topLevelComments
    : topLevelComments.slice(0, INITIAL_VISIBLE_COMMENTS);

  const hasHiddenComments = topLevelComments.length > INITIAL_VISIBLE_COMMENTS;

  const renderComments = (parentId) => {
    // key = comment._id of top-level comment === parentId of child comment(s)
    const key = String(parentId);
    // console.log("Child comments by parentId");
    const childComments = commentsByParent.get(key) || [];

    console.log("Comments grouped by parentId:");

    return childComments.map((comment) => (
      <div key={comment._id} className="comment">
        <Comment
          comment={comment}
          postId={post._id}
          parentId={parentId}
          post={post}
          onLikeComment={onLikeComment}
          onDeleteComment={onDeleteComment}
        />
        <div className="pl-8">
          {/* Second call */}
          {renderComments(comment._id)}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex w-full flex-col">
        <div className="mb-2 pb-2 pl-4 text-lg font-semibold text-gray-600">
          {t("reacties")}:
        </div>

        <div className="w-full">
          {visibleTopLevelComments.map((comment) => (
            <div key={comment._id} className="comment">
              {/* first render top-level comment with parentId:null*/}
              <Comment
                comment={comment}
                postId={post._id}
                parentId={null}
                post={post}
                onLikeComment={onLikeComment}
                onDeleteComment={onDeleteComment}
              />
              <div className="pl-8">
                {/* First call =  entry point for the recursive rendering of child comments */}
                {renderComments(comment._id)}
              </div>
            </div>
          ))}
        </div>

        {hasHiddenComments && (
          <div className="mx-auto flex px-4 pb-3">
            <button
              type="button"
              onClick={() => setShowAllComments((prev) => !prev)}
              className="rounded-full border-2 border-yellow-600 px-3 py-1 text-sm font-semibold text-yellow-700"
            >
              {showAllComments
                ? "Minder reacties tonen"
                : `Alle reacties bekijken (${topLevelComments.length})`}
            </button>
          </div>
        )}
      </div>

      <div className="flex h-auto w-full gap-2 px-4 pb-4 max-xxsm:px-2">
        <div className="h-[45px] w-[45px] overflow-hidden rounded-full bg-gray-200 max-xxsm:h-[40px] max-xxsm:w-[40px]">
          <Image
            src={profilePic ? profilePic : "/images/defaultAvatar1.png"}
            alt="avatar"
            width={45}
            height={45}
            className="h-full w-full object-cover"
          />
        </div>
        <PostCommentForm
          postId={post._id}
          post={post}
          setShowForm={setShowForm}
          showForm={showForm}
        />
      </div>
    </div>
  );
};

export default PostComment;

// React renders the first item from visibleTopLevelComments (first call)
// After rendering that top-level comment, it calls renderComments with that top-level comment’s id
// renderComments finds that comment’s direct children in commentsByParent Map (comments parentId === top-level comment's _id)
// It renders the first child
// While rendering that first child, it immediately calls renderComments again for that child’s id
// That keeps going down until there are no more children
// Then it comes back up one level and continues with the next sibling
// After the whole first top-level thread is finished, React continues to the second top-level comment
// Then the same process repeats for that whole thread
