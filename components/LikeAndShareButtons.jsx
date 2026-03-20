"use client"
import React,{useState, useEffect} from 'react'
import LikeButton from './LikeButton';
import { FaWhatsapp } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { WhatsappShareButton } from "react-share";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";


const LikeAndShareButtons = ({post}) => {

  const { data: session } = useSession();

  const [sharedPost, setSharedPost] = useState("");

  useEffect(() => {
    // This runs only on client
    setSharedPost(`${window.location.origin}/sharedpost/${post._id}`);
  }, [post._id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(sharedPost);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy the link.");
      console.error("Failed to copy link: ", err);
    }
  };


  return (
    <div className="flex w-full flex-row justify-between pl-4 pr-6">
      <LikeButton postId={post._id} post={post} />

      <div className="relative flex h-full cursor-pointer items-center group">
        {session ? (
          <WhatsappShareButton url={sharedPost}>
            <FaWhatsapp color="gray" size={30} className="cursor-pointer" />
          </WhatsappShareButton>
        ) : (
          <FaWhatsapp color="gray" size={30} className="" />
        )}
        <span className="absolute -top-8 left-3 -translate-x-1/2 scale-0 transform whitespace-nowrap rounded border-b border-gray-300 bg-gray-800 px-3 py-1 text-sm text-white opacity-0 shadow-md transition-all group-hover:scale-100 group-hover:opacity-100">
         Share on WhatsApp
        </span>
      </div>
      <div className="group relative">
        <TbShare3
          color="gray"
          size={30}
          className="cursor-pointer"
          onClick={handleCopyLink}
        />
        <span className="absolute -top-8 left-3 -translate-x-1/2 scale-0 transform whitespace-nowrap rounded border-b border-gray-300 bg-gray-800 px-3 py-1 text-sm text-white opacity-0 shadow-md transition-all group-hover:scale-100 group-hover:opacity-100">
          Copy Link
        </span>
      </div>
    </div>
  );
}

export default LikeAndShareButtons
