"use client";
import SinglePost from "./SinglePost";
import Spinner from "./Spinner";
import Image from "next/image";
import usePostsFetcher from "@/hooks/usePostsFeed";

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
      <div className="w-full max-w-[620px] flex-grow flex-col rounded-lg py-4">
        {posts.map((post) => (
          <div key={post._id}>
            <SinglePost post={post} />
          </div>
        ))}

        {!isReachingEnd ? (
          <div className="flex justify-center py-4">
            <button
              onClick={() => setSize(size + 1)}
              disabled={isLoadingMore}
              className="rounded-lg border-2 w-[150px] py-3 text-white disabled:border-0"
            >
              {isLoadingMore ? <Spinner loading={isLoadingMore} height={40} width={40} /> : "Meer berichten"}
            </button>
          </div>
        ) :  (<div className="flex m-auto justify-center py-4 rounded-lg border-2 w-[180px] text-white disabled:border-0 mt-12">
             Geen berichten meer  
            </div>)}
      </div>
    </div>
  );
};

export default GetAllPosts;
