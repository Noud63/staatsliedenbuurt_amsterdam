import React from 'react'
import Link from 'next/link';
import { useTranslations } from "next-intl";

const PostUserName = ({post}) => {

    const t = useTranslations("post");

  return (
    <div className="flex flex-col justify-start text-lg font-semibold text-black ml-2">
      <Link href={`/postsByUserId/${post.userId}`}> {/* Route to PostByUserId page */}
        <div>
          {post.name}
        </div>
      </Link>
      <span className="w-full flex text-sm font-normal text-gray-500">
        {t('gepostop')} {`${new Date(post.createdAt).toLocaleDateString()}`}
      </span>
    </div>
  );
}

export default PostUserName
