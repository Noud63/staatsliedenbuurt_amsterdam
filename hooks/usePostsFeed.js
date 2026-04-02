"use client"
import useSWR from "swr"
import { POSTS_ENDPOINTS, fetcher } from "@/lib/posts";

const usePostsFetcher = (initialData) => {
  const { data, error, isLoading } = useSWR(POSTS_ENDPOINTS.feed, fetcher, {
    fallbackData: initialData,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return { data, error, isLoading };
};

export default usePostsFetcher;