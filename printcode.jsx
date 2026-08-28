//Data flow clicking post likeButton

//Step 1:
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchPosts(userId) {
  try {
    if (!apiDomain) {
      return [];
    }
    const url = userId
      ? `${apiDomain}/getposts/postsByUserId/${userId}`
      : `${apiDomain}/getposts`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
//Step 2:
import { fetchPosts } from "@/utils/postsRequest";

export default async function Home() {
  const initialData = await fetchPosts();
  return (
    <>
      <LeesDit />
      <AddPost />
      <GetAllPosts initialData={initialData} />
    </>
  );
}

//Step 3:
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
  //...code
};

//Step 4:
import { usePostActions } from "@/hooks/usePostActions";

const LikeButton = ({ post }) => {
  const { data: session } = useSession();

  // Get centralized actions from hook
  let { likePost } = usePostActions(post);
};

//Step 5:
// usePostActions hook to handle all optimistic updates for posts and comments
const likePost = async (post) => {
  const postId = getPostId(post);

  //data comes from SWR’s cache. It is passed automatically by mutate to the updater function.
  mutatePostCaches(postId, post.userId, (data) =>
    updatePostsInCache(data, (p) =>
      p._id === postId
        ? {
            ...p,
            likesCount: p.likesCount + (p.likedByUser ? -1 : 1),
            likedByUser: !p.likedByUser,
          }
        : p,
    ),
  );

  await fetch(POSTS_ENDPOINTS.like(postId), {
    method: "POST",
  });
};

//Step 6:
import { getFeedKey, fetcher, PAGE_SIZE } from "@/lib/posts";

const usePostsFetcher = (initialData) => {
  const { data, error, isLoading, size, setSize, isValidating } =
    useSWRInfinite(getFeedKey, fetcher, {
      fallbackData: initialData ? [initialData] : undefined,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateFirstPage: true,
    });
  //useSWRInfinite returns an array of arrays, where each inner array represents a page of data.
  //[[post, post, post], [post, post, post], [post, post, post]]
  const posts = data ? data.flat() : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return { posts, error, isLoading, isLoadingMore, isReachingEnd };
};

//Step 7:
import { unstable_serialize } from "swr/infinite";
// ----- Shared fetcher -----
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// ----- Pagination key generator for useSWRInfinite -----
export const getFeedKey = (pageIndex, previousPageData) => {
  if (previousPageData && previousPageData.length === 0) return null;
  if (pageIndex === 0) return `${POSTS_ENDPOINTS.feed}?limit=${PAGE_SIZE}`;
  const lastPost = previousPageData[previousPageData.length - 1];
  return `${POSTS_ENDPOINTS.feed}?page=${lastPost._id}&limit=${PAGE_SIZE}`;
};

export const FEED_CACHE_KEY = unstable_serialize(getFeedKey);

//... more code, updatePostsInCache, filterPostsInCache

//Step 8:
export const POST = async (req, { params }) => {
  const { postId } = await params;
  const session = await getSessionUser();
  await connectDB();

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = session?.user.id;

  try {
    const liked = await PostLike.findOne({ postId, userId });
    if (liked) {
      // If already liked, remove the like
      await PostLike.findOneAndDelete({ postId, userId });
      const post = await Post.findByIdAndUpdate(postId, {
        $inc: { likesCount: -1 },
      });

      if (post && post.userId.toString() !== userId) {
        await Notification.findOneAndDelete({
          recipient: post.userId,
          sender: userId,
          type: "like",
          post: post._id,
          postId: post._id,
        });
      }

      return new Response(JSON.stringify({ message: "dec" }), { status: 200 });
    } else {
      // If not liked, create a new like
      await PostLike.create({ userId, postId });
      const post = await Post.findByIdAndUpdate(postId, {
        $inc: { likesCount: 1 },
      });

      if (post && post.userId.toString() !== userId) {
        await Notification.create({
          recipient: post.userId,
          sender: userId,
          type: "like",
          post: post._id,
          postId: post._id,
          isRead: false,
        });
      }

      return new Response(JSON.stringify({ message: "inc" }), { status: 200 });
    }
  } catch (error) {
    return new Response({ message: error.message }, { status: 500 });
  }
};
