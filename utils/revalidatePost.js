
import { mutate } from "swr";
import { POSTS_ENDPOINTS } from "@/lib/posts";

export const revalidatePostCaches = async (postId, userId) => {
  await Promise.all([
    mutate(POSTS_ENDPOINTS.feed),
    mutate(POSTS_ENDPOINTS.byUser(userId)),
    mutate(POSTS_ENDPOINTS.single(postId)),
    mutate("/api/getNotifications"),
  ]);
};

export const revalidateNotificationsCaches = async (postId) => {
  await mutate("/api/getNotifications");
};
