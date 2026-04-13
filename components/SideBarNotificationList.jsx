"use client";
import React, { useRef, useMemo } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaThumbsUp } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useSWR from "swr";
import NotificationListItems from "./NotificationListItems";
import { fetcher } from "@/lib/posts";

const SideBarNotificationList = ({
  setCount,
  showPanel,
  setShowPanel,
  setPostId,
  count,
}) => {
  const { data: session } = useSession();

  const sidebarRef = useRef(null);

  const { data, error, mutate } = useSWR(
    session?.user?.id ? "/api/getNotifications" : null,
    fetcher,
  );

   const notifications = useMemo(() => {
    return data?.notifications || [];
  }, [data]);

  useEffect(() => {
    // Check if data and notifications are not empty, wait for fetch!
    // Otherwise count is set to 0, no notifications!
    if (!data) return;
    if (!notifications) return;

    if (notifications.length > 9) {
      setCount(9);
    } else {
      setCount(notifications.length);
    }
  }, [data, notifications, setCount]);

  // Close when clicking outside sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      // console.log("Clicked outside sidebar:", event.target);
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) // true, same as sidebarRef.current.contains(event.target) === false
      ) {
        setShowPanel(false);
      }
    }
    if (showPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel, setShowPanel]);

  const getLikedPost = (postId) => {
    if (!postId) {
      console.warn("No postId found for notification:", note);
      return;
    }
    setPostId(postId);
    setShowPanel(false);
  };

  const deleteAllNotifications = async () => {
    try {
      // Optimistic update
      mutate(
        "/api/getNotifications",
        (data) => {
          if (!data) return data;
          return { ...data, notifications: [] };
        },
        false,
      );
      // Send delete request to server
      const response = await fetch("/api/deleteAllNotifications", {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete notifications");

      // Revalidate to ensure server truth
      mutate("/api/getNotifications");

      setShowPanel(false);
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  return (
    <div
      className={`sidebar_scroll ${showPanel ? "translate-x-0" : "translate-x-full"} singlepost fixed bottom-0 right-0 top-0 z-[10] 
      flex h-dvh max-h-dvh w-full max-w-[340px] flex-col overflow-y-auto bg-gradient-to-r from-yellow-800 to-red-950 pb-16 pl-3 shadow-xl backdrop-blur-sm transition duration-300 ease-in`}
      ref={sidebarRef}
    >
      <div className="mt-4 flex w-full justify-around border-b border-white">
        <FaThumbsUp color="#fff" size={24} className="mb-4 mr-2" />
        <IoMdCloseCircleOutline
          color="#fff"
          size={30}
          onClick={() => setShowPanel(false)}
          className="mb-4 cursor-pointer"
        />
      </div>
      <ul className="flex flex-col">
        {notifications.map((note) => (
          <NotificationListItems
            key={note._id}
            note={note}
            getLikedPostOrComment={getLikedPost}
          />
        ))}
      </ul>

      <button
        type="button"
        className="mx-auto mt-8 w-full rounded-lg border-2 border-white py-2 text-white"
        onClick={deleteAllNotifications}
      >
        Verwijder notificaties
      </button>

      {/* <div className="flex w-full justify-center">
        <div className="mt-8 flex items-center justify-center rounded-full border border-white p-2">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={100}
            height={0}
            className="h-[18px] w-[18px] rotate-6 object-cover"
          />
        </div>
      </div> */}
    </div>
  );
};

export default SideBarNotificationList;

// Like a comment
// await Notification.create({
//           recipient: comment.userId,
//           sender: userId,
//           type: "like",
//           comment: comment._id,
//           isRead: false,
//           postId: comment.postId
//         });

// Example notification object structure:
// Like on a comment does not have a post field
// {
//     "_id": "68f8e252749a42238ef40357",
//     "recipient": "67a3453aee56feb8d589b01d",
//     "type": "like",
//     "comment": {
//       "_id": "68f8c9dc491e65f26f9b499e",
//       "postId": "68f2379f211b5e16e76a9d84",
//       "parentId": "68f8c990491e65f26f9b496f",
//       "userId": "67a3453aee56feb8d589b01d",
//       "username": "Jane",
//       "comment": "Jazeker, dat is niet te geloven!",
//       "likesCount": 1,
//       "createdAt": "2025-10-22T12:11:08.331Z",
//       "updatedAt": "2025-10-22T13:55:30.782Z",
//       "__v": 0
//     },
//     "sender": {
//       "_id": "66f531615ed693d84f788a5e",
//       "name": "Noud van Dun",
//       "username": "Noud",
//       "avatar": "https://res.cloudinary.com/ajhvdwebdev/image/upload/v1758188017/nextjs_blog/rz4hpxtfsk946mu5ce7t.png"
//     },
//     "postId": "68f2379f211b5e16e76a9d84",
//     "isRead": false,
//     "createdAt": "2025-10-22T13:55:30.766Z",
//     "__v": 0
//   },
