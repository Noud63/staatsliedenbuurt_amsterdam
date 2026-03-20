"use client";
import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { usePostActions } from "@/hooks/usePostActions";

const LikeButton = ({post}) => {
  const { data: session } = useSession();

   // Get centralized actions from hook
  let { likePost } = usePostActions(post);

  return (
    <div className="flex items-center justify-center">
      <button type="button" disabled={!session} onClick={() => likePost(post)}>
        <FaThumbsUp
          color="gray"
          size={20}
          disabled={!session?.user ? true : false}
          className="mr-2 cursor-pointer"
        />
      </button>
      <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
        {post.likesCount}
      </div>
    </div>
  );
};

export default LikeButton;
