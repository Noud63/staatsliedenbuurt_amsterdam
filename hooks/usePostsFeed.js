"use client";
import useSWRInfinite from "swr/infinite";
import { getFeedKey, fetcher, PAGE_SIZE } from "@/lib/posts";

const usePostsFetcher = (initialData) => {
  const { data, error, isLoading, size, setSize, isValidating } =
    useSWRInfinite(getFeedKey, fetcher, {
      fallbackData: initialData ? [initialData] : undefined,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateFirstPage: true,
    });

  const posts = data ? data.flat() : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return {
    posts,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
    isValidating,
  };
};

export default usePostsFetcher;
