"use client";
import React, { useState } from "react";
import Image from "next/image";
import PostCommentForm from "./PostCommentForm";
import { useSession } from "next-auth/react";
import Comment from "./Comment";
import { useTranslations } from "next-intl";

const PostComment = ({post, onLikeComment, onDeleteComment}) => {
  
  const { data: session } = useSession();
  const profilePic = session?.user?.avatar;

  const t = useTranslations("reactie");

  // showForm is needed separatly in comment and PostComment to avoid error in PostCommentForm
  const [showForm, setShowForm] = useState(false);

  //Recursive function to render comments
  //Recursion occurs when the definition of a concept or process depends on a simpler or previous version of itself.
  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <div key={comment._id} className="comment">
          {/* Render top-level comments */}
          <Comment
            comment={comment}
            postId={post._id}
            parentId={parentId}
            post={post}
            onLikeComment={onLikeComment}
            onDeleteComment={onDeleteComment}
          />
          <div className="pl-8">{renderComments(comments, comment._id)}</div>
        </div>
      ));
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex w-full flex-col">
        <div className="mb-2 pb-2 pl-4 text-lg font-semibold text-gray-600">
          {t("reacties")}:
        </div>
        <div className="w-full">{renderComments(post.comments)}</div>
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
