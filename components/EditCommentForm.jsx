"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { useTranslations } from 'next-intl';
import { usePostActions } from "@/hooks/usePostActions";

const EditCommentForm = ({comment, setShowEditComment, post}) => {
  
  const [commentContent, setCommentContent] = useState(comment?.comment);

  const textareaRef = useRef(null);

  const t = useTranslations("auth");  

  let { editComment, deleteComment } = usePostActions()

  const updatedData = {
    commentContent,
  };


  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      // Move cursor to end of text
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }
  }, []);


  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
    }
  }, [commentContent]); // Depend on comment to update on each change


  const handleEditPost = async (e) => {
    e.preventDefault();
  
  if(commentContent === ""){
     await deleteComment(comment._id, post)
  }
    const formData = new FormData(e.target);
    formData.append("commentContent", commentContent);

    // Optimistic + actual update
    await editComment(comment._id, post, formData, commentContent);

    setShowEditComment(false);
  };

  return (
    <div className="flex w-full items-center justify-center overflow-y-auto rounded-lg border-b border-gray-300 bg-yellow-800/10 shadow-sm">
      <div className="w-full overflow-y-auto rounded-lg px-4">
        <form onSubmit={handleEditPost} className="w-full">
          <div className="w-full">
            <textarea
              ref={textareaRef}
              type="text"
              name="commentContent"
              defaultValue={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="max-h-[500px] w-full resize-none rounded-xl bg-transparent py-2 pr-10 text-black text-base placeholder-gray-500 outline-none"
            />
          </div>

          <div className="mb-2 flex w-full justify-between border-t border-yellow-800 pt-2">
            <div className="flex items-center justify-between pb-1 pt-2">
            
              <div
                className="flex cursor-pointer items-center"
                onClick={() => setShowEditComment(false)}
              >
                <IoMdCloseCircleOutline size={24} color={"#854d0e"} />
              </div>
            </div>
            <button
              type="submit"
              className="flex flex-row items-center gap-1 font-normal text-yellow-800"
            >
              <div className="text-[22px]">
                <IoSendSharp color="#854d0e" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCommentForm