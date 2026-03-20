"use client"
import React from 'react'
import Link from 'next/link';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useLocale } from 'next-intl';
import Image from "next/image";
import PostUserName from "@/components/PostUserName";
import PostComment from './PostComment';

const SharedPost = ({sharedPost}) => {

const locale = useLocale();

  return (
    <div className="mx-auto flex w-full max-w-[670px] flex-grow flex-col rounded-lg py-4">
        
      <div className="singlepost relative mx-6 mb-4 flex h-auto flex-col rounded-lg bg-white shadow-md max-sm:mx-4 max-xsm:mx-2">

        <div className="flex w-full items-center justify-between border-b border-gray-400 p-4 pb-2 max-xxsm:pl-2">
          <div className="flex flex-1">
            <div className="flex h-[45px] w-[45px] flex-row overflow-hidden max-xxsm:h-[40px] max-xxsm:w-[40px]">
              <Image
                src={
                  sharedPost ? sharedPost.avatar : "/images/defaultAvatar.png"
                }
                alt="icon"
                width={45}
                height={45}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <PostUserName post={sharedPost} />
          </div>
        </div>

        <div className="p-4">{sharedPost.postContent}</div>

        <div className="w-full">
          {sharedPost?.images[0] && (
            <Image
              src={sharedPost?.images[0]}
              alt=""
              width={400}
              height={0}
              className="h-full w-full cursor-pointer object-cover"
              priority
            />
          )}
        </div>

        <div className="flex w-full flex-col bg-white text-gray-500">
          <div className="flex items-center justify-around gap-2 p-4 text-base font-semibold">
            <div className="">Like this post?</div>
            <div className="">
              <Link href={`/${locale}/register`}>Join the party!</Link>
            </div>
          </div>
          <div className="flex h-[60px] w-full items-center justify-center bg-gradient-to-r">
            <div className="text-center font-CloisterBlack text-2xl text-white">
              <Link href={`/${locale}`}>Staatslieden</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SharedPost
