import { mutate } from "swr";
import { unstable_serialize } from "swr/infinite";

// ----- Endpoints -----
export const POSTS_ENDPOINTS = {
  feed: "/api/getposts",
  byUser: (userId) => `/api/getposts/postsByUserId/${userId}`,
  single: (postId) => `/api/getSinglePost/${postId}`,
  create: "/api/posts",
  like: (postId) => `/api/posts/${postId}/like`,
};

export const PAGE_SIZE = 3;

// ----- Shared fetcher -----
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// ----- Pagination key generator for useSWRInfinite -----
export const getFeedKey = (pageIndex, previousPageData) => {
  if (previousPageData && previousPageData.length === 0) return null;
  if (pageIndex === 0) return `${POSTS_ENDPOINTS.feed}?limit=${PAGE_SIZE}`;
  const lastPost = previousPageData[previousPageData.length - 1];
  return `${POSTS_ENDPOINTS.feed}?cursor=${lastPost._id}&limit=${PAGE_SIZE}`;
};

export const getByUserKey = (userId) => (pageIndex, previousPageData) => {
  if (previousPageData && previousPageData.length === 0) return null;
  if (pageIndex === 0)
    return `${POSTS_ENDPOINTS.byUser(userId)}?limit=${PAGE_SIZE}`;
  const lastPost = previousPageData[previousPageData.length - 1];
  return `${POSTS_ENDPOINTS.byUser(userId)}?cursor=${lastPost._id}&limit=${PAGE_SIZE}`;
};

// These are the exact keys useSWRInfinite uses internally
export const FEED_CACHE_KEY = unstable_serialize(getFeedKey);
export const getByUserCacheKey = (userId) =>
  unstable_serialize(getByUserKey(userId));

// ----- Cache helpers -----
export const revalidateFeedCache = () => mutate(FEED_CACHE_KEY);

// These handle flat arrays, paginated arrays (array of arrays), and single post objects

// Map over every post in any cache shape
export function updatePostsInCache(data, updater) {
  if (!data) return data;

  // Paginated: array of page arrays (useSWRInfinite)
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    return data.map((page) => page.map(updater));
  }

  // Flat array
  if (Array.isArray(data)) {
    return data.map(updater);
  }

  // Single post object
  return updater(data);
}

// Filter posts in any cache shape
export function filterPostsInCache(data, predicate) {
  if (!data) return data;

  // Paginated
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    return data.map((page) => page.filter(predicate));
  }

  // Flat array
  if (Array.isArray(data)) {
    return data.filter(predicate);
  }

  // Single post — return null if filtered out
  return predicate(data) ? data : null;
}

// ----- API calls -----
export async function createPost(formData) {
  const res = await fetch(POSTS_ENDPOINTS.create, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}
