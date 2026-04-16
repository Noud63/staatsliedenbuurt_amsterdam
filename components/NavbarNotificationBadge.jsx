"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaThumbsUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import SinglePost from "./SinglePost";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Spinner from "./Spinner";
import { mutate } from "swr";
import SideBarNotificationList from "./SideBarNotificationList";
import SingleNotificationPost from "./SingleNotificationPost";


export default function NavbarNotificationBadge() {
  
  const { data: session } = useSession();
  const [count, setCount] = useState();
  const [showPanel, setShowPanel] = useState(false);
  const [postId, setPostId] = useState(null);

  const handleBadgeClick = () => {
    setShowPanel((prev) => !prev);
  };

  if (!session?.user?.id || count === 0) return null;

  return (
    <>
      <button onClick={handleBadgeClick} disabled={showPanel}>
        <div
          className="relative cursor-pointer"
        >
          <div className="absolute -top-[30px] -right-[22px] flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">{count}</div>
        </div>
      </button>

      <SideBarNotificationList
        postId={postId}
        setCount={setCount}
        count={count}
        showPanel={showPanel}
        setShowPanel={setShowPanel}
        setPostId={setPostId}
      />

      {postId && (
        <SingleNotificationPost
          postId={postId}
          setPostId={() => setPostId(null)}
        />
      )}
    </>
  );
}
