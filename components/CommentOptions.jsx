"use client"
import React from 'react'
import { useTranslations } from 'next-intl';
import edit from "../assets/icons/edit.png";
import deleteIcon from "../assets/icons/delete.png";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from 'next/image';

const CommentOptions = ({
  comment,
  userId,
  deleteComment,
  setShowOptions,
  setShowEditComment,
  showEditComment,
  onDeleteComment
}) => {

  const t = useTranslations("auth");

  return (
    <div
      className="commentOptions absolute -right-3 top-11 z-10 flex w-[200px] flex-col justify-start rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-lg"
      onClick={() => setShowOptions(false)}
    >
      {comment.userId === userId && (
        <button
          type="button"
          className="cursor-pointer border-b border-gray-400 py-2 text-[16px] font-semibold text-gray-600"
          onClick={() => setShowEditComment(!showEditComment)}
        >
          <div className="flex flex-row items-center gap-1">
            <Image
              src={edit}
              alt=""
              width={28}
              height={28}
              className="h-[28px] w-[28px] cursor-pointer p-2"
            />
            {t("bewerk")}
          </div>
        </button>
      )}

      {comment.userId === userId && (
        <button
          type="button"
          className="cursor-pointer border-b border-gray-400 py-2 text-2xl text-[16px] font-semibold text-gray-600"
          onClick={() => onDeleteComment(comment._id)}
        >
          <div className="flex flex-row items-center gap-1">
            <Image
              src={deleteIcon}
              alt=""
              width={28}
              height={28}
              className="h-[32px] w-[28px] cursor-pointer p-2"
            />
            {t("verwijder")}
          </div>
        </button>
      )}

      <div
        className="flex cursor-pointer justify-center pt-3"
        onClick={() => setShowOptions(false)}
      >
        {" "}
        <IoMdCloseCircleOutline size={24} color={"black"} />
      </div>

      <div className="absolute -top-[12px] right-3 h-0 w-0 border-b-[12px] border-l-[10px] border-r-[10px] border-b-white border-l-transparent border-r-transparent"></div>
    </div>
  );
};

export default CommentOptions
