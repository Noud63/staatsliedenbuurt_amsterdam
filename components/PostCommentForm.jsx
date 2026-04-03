"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { IoSendSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePostActions } from "@/hooks/usePostActions";

const PostCommentForm = ({ postId, parentId = null, setShowForm, post }) => {
  const [text, setText] = useState("");
  const [sendButton, setSendButton] = useState(false);

  const { data: session } = useSession();
  const id = session?.user?.id;
  const user = session?.user;

  const { addComment } = usePostActions();

  const textareaRef = useRef(null);

  const router = useRouter();

  const t = useTranslations("placeholder");

  const tempComment = {
    _id: `temp-${Date.now()}`,
    postId,
    parentId: parentId || null,
    userId: session?.user.id,
    username: session?.user.username,
    comment: text,
    createdAt: new Date().toISOString(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await addComment(post, postId, tempComment);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    } finally {
      if (textareaRef.current) textareaRef.current.value = "";
      setSendButton(false);
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (text) {
      setSendButton(true);
    } else if (text === "") {
      setSendButton(false);
      setShowForm(false);
    }
  }, [text]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleTextareaClick = () => {
    if (!session) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
    }
  }, [text]); // Depend on comment to update on each change

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-1">
      <textarea
        ref={textareaRef}
        type="text"
        name="comment"
        className="outline-non max-h-[500px] w-full resize-none overflow-y-hidden rounded-xl bg-yellow-800/10 py-2 pl-2 pr-10 text-black placeholder-gray-500"
        placeholder={t("schrijfeenreactie")}
        defaultValue={text}
        onChange={handleInputChange}
        onClick={handleTextareaClick}
        disabled={!user}
      />
      <button
        type="submit"
        className="absolute bottom-2 right-2 cursor-pointer"
      >
        {sendButton && <IoSendSharp color="brown" size={25} />}
      </button>
    </form>
  );
};

export default PostCommentForm;
