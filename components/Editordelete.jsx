"use client";
import { useState } from "react";
import Image from "next/image";
import edit from "../assets/icons/edit.png";
import deleteIcon from "../assets/icons/delete.png";
import EditPostForm from "./EditPostForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { usePostActions } from "@/hooks/usePostActions";

const Editordelete = ({ showOptions, setShowOptions, postId, post}) => {

  const [showEditForm, setShowEditForm] = useState(false);

  const { deletePost } = usePostActions(post);

  const t = useTranslations("auth");

  const showEditPostModal = () => {
    setShowEditForm(true);
    setShowOptions(false);
  };

return (
    <>
      {showEditForm && (
        <EditPostForm setShowEditForm={setShowEditForm} post={post} />
      )}
      {showOptions && (
        <div className={`postMenu absolute right-3 ${postId ? 'top-32' : 'top-16'} flex h-auto w-[240px] flex-col rounded-lg bg-white p-4 text-lg font-semibold border border-gray-300`}>
          <div
            className="items-center flex-row mb-2 flex w-full cursor-pointer border-b border-gray-400 pb-2"
            onClick={showEditPostModal}
          >
            <Image
              src={edit}
              alt=""
              width={32}
              height={32}
              className="h-[32px] w-[32px] cursor-pointer p-2"
            />
            <span className="text-black">{t("bewerk")}</span>
          </div>
          <div
            className="flex w-full cursor-pointer flex-row items-center border-b border-gray-400 pb-2"
            onClick={() => deletePost(post._id, post.userId)}
          >
            <Image
              src={deleteIcon}
              alt=""
              width={32}
              height={32}
              className="h-[34px] w-[32px] cursor-pointer p-2"
            />
            <span className="text-black">{t("verwijder")}</span>
          </div>
          <div className="mt-4 flex w-full justify-center">
            <button type="button" onClick={() => setShowOptions(false)}>
              <AiOutlineCloseCircle size={24} color="#000" />
            </button>
          </div>

          <div className="absolute -top-[12px] right-3 h-0 w-0 border-b-[12px] border-l-[10px] border-r-[10px] border-b-white border-l-transparent border-r-transparent"></div>
        </div>
      )}
    </>
  );
};

export default Editordelete;
