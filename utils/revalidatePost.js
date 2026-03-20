
import { mutate } from "swr";

export const revalidatePostCaches = async (postId, userId) => {
  await Promise.all([
    mutate("/api/getposts"),
    mutate(`/api/getposts/postsByUserId/${userId}`),
    mutate(`/api/getSinglePost/${postId}`),
    mutate("/api/getNotifications"),
  ]);
};

export const revalidateNotificationsCaches = async (postId) => {
  await mutate("/api/getNotifications");
};
