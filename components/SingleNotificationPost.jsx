"use client"
import React from "react";
import SinglePost from "./SinglePost";
import Spinner from "./Spinner";

const SingleNotificationPost = ({ postId, setPostId }) => {
  
  if (!postId) {
    return <Spinner loading={true} height={50} width={50} />;
  }
  return (
    <div
      className="singleNotificationPost fixed inset-0 z-50 flex items-center justify-center bg-yellow-950/80"
      onClick={setPostId}
    >
      <div
        className="relative max-h-[100vh] w-full max-w-[720px] overflow-y-auto p-6 shadow-xl max-sm:px-2 max-sm:pt-2 max-sm:pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <SinglePost postId={postId} setPostId={setPostId} />
      </div>
    </div>
  );
};

export default SingleNotificationPost;
