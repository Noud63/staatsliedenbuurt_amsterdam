"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import threedots from "../assets/icons/threedots.png";
import { mutate } from "swr";
import { useTranslations } from "next-intl";
import commentIcon from "../assets/icons/comment.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import PostCommentForm from "./PostCommentForm";
import EditCommentForm from "./EditCommentForm";
import CommentOptions from "./CommentOptions"; // Assuming you have a separate component for comment options

const Comment = ({ comment, parentId, post, onLikeComment, onDeleteComment }) => {
  const { data: session } = useSession();

  const t = useTranslations("auth");

  // showForm is needed separatly in comment and PostComment to avoid error in PostCommentForm
  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);

  const userId = session?.user?.id;

  useEffect(() => {
    if (showForm && showOptions) {
      setShowForm(false);
    }
  }, [showForm, showOptions]);


  return (
    <div className="mb-2 flex h-auto w-full gap-2 px-4 max-xxsm:px-2">
      <div
        className={`${parentId === null ? "h-[40px] w-[40px]" : "h-[30px] w-[30px]"} flex overflow-hidden rounded-full`}
      >
        <Image
          src={comment.avatar ? comment.avatar : "/images/defaultAvatar1.png"}
          alt="icon"
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full flex-1 flex-col">
        <div>
          {showEditComment && (
            <EditCommentForm
              comment={comment}
              setShowEditComment={setShowEditComment}
              post={post}
            />
          )}
        </div>

        {!showEditComment && (
          <div className="flex flex-1 flex-col rounded-xl border-b border-gray-300 bg-yellow-800/10 px-2 pb-2 pt-1 leading-[18px] shadow-sm">
            <span className="text-sm font-semibold text-gray-800">
              {comment.username}
            </span>
            <span className="text-[15px] text-gray-800">{comment.comment}</span>
          </div>
        )}

        <div className="flex flex-row justify-between pr-2 text-[11px] font-normal text-gray-500">
          <span className="pl-2 pt-[8px]">
            {`${new Date(comment.createdAt).toLocaleDateString()}`}
          </span>

          <div className="relative flex flex-row items-center gap-2">
            {userId && (
              <button
                type="button"
                className="cursor-pointer py-2 text-sm text-gray-600"
                onClick={() => setShowForm(!showForm)}
              >
                {t("reageer")}
              </button>
            )}

            <button
              type="button"
              className="mt-1 flex h-[24px] cursor-pointer items-center justify-center gap-1 rounded-full border border-gray-400 px-2 text-[14px] font-semibold text-gray-600"
              onClick={() => onLikeComment(comment._id)}
              disabled={!session}
            >
              {comment.likedByUser ? (
                <div className="flex items-center">
                  <FaHeart color="#ca8a04" size={15} />
                </div>
              ) : (
                <div className="flex items-center">
                  <FaRegHeart size={15} color="#ca8a04" />
                </div>
              )}{" "}
              {comment.likesCount}
            </button>

            {userId && comment.userId === userId && (
              <div className="mt-1 h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full p-[4px] transition-all duration-500 hover:bg-yellow-800/10">
                <Image
                  src={threedots}
                  alt=""
                  width={24}
                  height={24}
                  className="flex h-full w-full"
                  onClick={() => setShowOptions(!showOptions)}
                />
              </div>
            )}

            {showOptions && (
              <CommentOptions
                comment={comment}
                userId={userId}
                setShowOptions={setShowOptions}
                showOptions={showOptions}
                setShowForm={setShowForm}
                showForm={showForm}
                setShowEditComment={setShowEditComment}
                showEditComment={showEditComment}
                onDeleteComment={onDeleteComment}
              />
            )}
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out ${showForm ? "max-h-[500px] translate-x-0 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
        >
          <PostCommentForm
            postId={comment.postId}
            parentId={comment._id}
            setShowForm={setShowForm}
            showForm={showForm}
            post={post}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
