"use client";
import { useEffect } from "react";
import SinglePost from "./SinglePost";
import Spinner from "./Spinner";
import Image from "next/image";
import usePostsFetcher from "@/hooks/usePostsFeed";
import { useInView } from "react-intersection-observer";

const GetAllPosts = ({ initialData }) => {
  const {
    posts,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
  } = usePostsFetcher(initialData);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px",
  });

  useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) {
      setSize((currentSize) => currentSize + 1);
    }
  }, [inView, isLoadingMore, isReachingEnd, setSize]);

  if (error)
    return (
      <div className="mx-auto mt-8 flex min-h-[200px] w-full max-w-[620px] flex-col items-center justify-center rounded-lg text-2xl text-white">
        <Image
          src="/images/halloween.png"
          alt="error"
          width={145}
          height={145}
          sizes="100vw"
          className="h-[145px] w-[145px]"
        />
        <span>failed to load data!</span>
        <span>Refresh the page!</span>
      </div>
    );

  if (isLoading) {
    return (
      <div className="mt-[100px]">
        <Spinner loading={isLoading} height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center px-4 max-xsm:px-0">
      <div className="w-full max-w-[630px] flex-grow flex-col rounded-lg py-4">
        {posts.map((post) => (
          <div key={post._id}>
            <SinglePost post={post} />
          </div>
        ))}

        {!isReachingEnd ? (
          <div ref={ref} className="flex min-h-16 justify-center py-4">
            {isLoadingMore && <Spinner loading height={40} width={40} />}
          </div>
        ) : (
          <div className="m-auto mt-12 flex w-[180px] justify-center rounded-lg border-2 py-2 text-white">
            Geen berichten meer
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllPosts;
