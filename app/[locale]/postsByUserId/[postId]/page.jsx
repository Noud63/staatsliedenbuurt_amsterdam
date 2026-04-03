"use client";
import React, { use } from "react";
import SinglePost from "@/components/SinglePost";
import useSWRInfinite from "swr/infinite";
import Spinner from "@/components/Spinner";
import { getByUserKey, fetcher, PAGE_SIZE } from "@/lib/posts";
import { useTranslations } from "next-intl";

const PostByUserPage = ({ params }) => {
  // Client component — use use() to access params directly without useRouter or useSearchParams
  const { postId: userId } = use(params); // PostId is the userId in this context

  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    getByUserKey(userId),
    fetcher,
  );

  console.log("Data:", data, "Loading:", isLoading, "Size:", size);
  
    const t = useTranslations("post");

  const posts = data ? data.flat() : [];
  const userName = posts[0]?.name;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isReachingEnd =
    data?.[0]?.length === 0 ||
    (data && data[data.length - 1]?.length < PAGE_SIZE);

  if (isLoading)
    return (
      <div className="mt-[150px]">
        <Spinner loading={isLoading} height={50} width={50} />
      </div>
    );

  if (error)
    return (
      <div className="mt-20 flex justify-center text-xl text-white">
        Error loading posts!
      </div>
    );

  return (
    <>
      <div className="py-4">
        <div className="mb-4 flex w-full items-center justify-start rounded-lg border-2 px-4 py-2 text-white max-xsm:px-0">
          <div>
            <span>{t("allepostvan")}</span>
            <span className="ml-1 text-lg font-semibold">{userName}</span>
          </div>
        </div>
        {posts.map((post) => (
          <SinglePost post={post} key={post._id} comments={post.comments} />
        ))}

        {!isReachingEnd && (
          <div className="flex justify-center py-4">
            <button
              onClick={() => setSize(size + 1)}
              disabled={isLoadingMore}
              className="rounded-lg bg-gradient-to-r from-red-950 via-yellow-700 to-red-950 px-6 py-3 text-white disabled:opacity-50"
            >
              {isLoadingMore ? "Laden..." : "Meer berichten"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PostByUserPage;
