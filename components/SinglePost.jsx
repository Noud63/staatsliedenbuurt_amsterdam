"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import LikeandShareBar from "./LikeandShareBar";
import PostComment from "./PostComment";
import Editordelete from "./Editordelete";
import PostUserName from "./PostUserName";
import threedots from "../assets/icons/threedots.png";
import { usePostActions } from "@/hooks/usePostActions";
import Spinner from "./Spinner";
import CloseSinglePostButton from "./CloseSinglePostButton";


const fetcher = (url) => fetch(url).then((res) => res.json());

const SinglePost = ({ postId, post: initialPost, setPostId }) => {
  // SWR fetch only if no initial post is provided
  const { data: post, mutate, isLoading } = useSWR(
    postId ? `/api/getSinglePost/${postId}` : null,
    fetcher,
    { fallbackData: initialPost }
  );

  const { data: session } = useSession();
  const [showThreeDots, setShowThreeDots] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [open, setOpen] = useState(false);

   const { likePost, likeComment, deleteComment} = usePostActions(post);

   //Prevent background from scrolling when modal is open
  useEffect(() => {
    if (postId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // cleanup on unmount
    };
  }, [postId]);


  useEffect(() => {
    if (session?.user?.id === post?.userId) {
      setShowThreeDots(true);
    }
    if (post?.avatar) {
      setProfilePic(post.avatar);
    }
  }, [session, post?.userId, post?.avatar]);

  const slides = post?.images?.length ? post.images.map((img) => ({ src: img })) : [];

  if (!post){
  return <Spinner loading={isLoading} height={50} width={50} />;
  }
  
 return (
    <div className={`singlepost ${postId ? "max-xsm:mx-0" : "max-xsm:mx-2"} relative mb-4 flex h-auto flex-col rounded-xl bg-white shadow-md`}>

      {postId && <div className="w-full h-full bg-gradient-to-r from-red-950 via-yellow-700 to-red-950 rounded-t-lg"><CloseSinglePostButton setPostId={setPostId} /></div>}

      <Editordelete
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        postId={postId}
        post={post}
      />

      <div className="flex w-full items-center justify-between border-b border-gray-400 p-4 pb-2">
        <div className="flex flex-1 items-center">
          <div className="flex h-[45px] w-[45px] flex-row overflow-hidden">
            <Image
              src={profilePic ? profilePic : "/images/defaultAvatar.png"}
              alt="icon"
              width={45}
              height={45}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <PostUserName post={post} />
        </div>

        {showThreeDots && (
          <div>
            <Image
              src={threedots}
              alt=""
              width={40}
              height={40}
              className="h-[40px] w-[40px] cursor-pointer rounded-full p-2 transition-all duration-500 hover:bg-yellow-800/10"
              onClick={() => setShowOptions(!showOptions)}
            />
          </div>
        )}
      </div>

      <div className="p-4 text-black">{post.postContent}</div>

      {post?.images?.[0] && (
        <Image
          src={post.images[0]}
          alt=""
          width={400}
          height={200}
          className="h-auto w-full cursor-pointer "
          onClick={() => setOpen(true)}
          priority
        />
      )}

      <LikeandShareBar post={post} onLike={() => likePost(post)} />
      <PostComment post={post} onLikeComment={(commentId) => likeComment(commentId, post)}
        onDeleteComment={(commentId) => deleteComment(commentId, post)}/>

      {slides.length > 0 && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          plugins={[Zoom, Captions]}
          zoom={{ scrollToZoom: true, maxZoomPixelRatio: 5 }}
          slides={slides}
          carousel={{ finite: slides.length <= 1 }}
          render={{
            buttonPrev: slides.length <= 1 ? () => null : undefined,
            buttonNext: slides.length <= 1 ? () => null : undefined,
          }}
          styles={{ container: { backgroundColor: "rgb(0,0,0, 0.5)" } }}
        />
      )}
    </div>
    
  );
};

export default SinglePost;
