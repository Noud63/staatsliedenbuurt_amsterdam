import { mutate } from "swr";

// ----- Endpoints -----
export const POSTS_ENDPOINTS = {
  feed: "/api/getposts",
  byUser: (userId) => `/api/getposts/postsByUserId/${userId}`,
  single: (postId) => `/api/getSinglePost/${postId}`,
  create: "/api/posts",
  like: (postId) => `/api/posts/${postId}/like`,
};

// ----- Shared fetcher -----
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// ----- Cache helpers -----
export const matchPostCacheKeys = (postId) => (key) =>
  typeof key === "string" &&
  (key === POSTS_ENDPOINTS.feed ||
    key.startsWith("/api/getposts/postsByUserId/") ||
    key === POSTS_ENDPOINTS.single(postId));

export const revalidateFeedCache = () => mutate(POSTS_ENDPOINTS.feed);

// ----- API calls -----
export async function createPost(formData) {
  const res = await fetch(POSTS_ENDPOINTS.create, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}
