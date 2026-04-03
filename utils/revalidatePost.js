import { mutate } from "swr";
import {
  POSTS_ENDPOINTS,
  FEED_CACHE_KEY,
  getByUserCacheKey,
} from "@/lib/posts";

// Revalidate all post-related caches including paginated (useSWRInfinite) keys
export const revalidatePostCaches = async (postId, userId) => {
  await Promise.all([
    // Revalidate paginated feed (exact serialized infinite key)
    mutate(FEED_CACHE_KEY),
    // Revalidate paginated byUser (exact serialized infinite key)
    userId ? mutate(getByUserCacheKey(userId)) : Promise.resolve(),
    mutate(POSTS_ENDPOINTS.single(postId)),
    mutate("/api/getNotifications"),
  ]);
};

export const revalidateNotificationsCaches = async () => {
  await mutate("/api/getNotifications");
};
