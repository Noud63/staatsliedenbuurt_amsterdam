import connectDB from "@/connectDB/database";
import Post from "@/models/post";
import PostLike from "@/models/postLikes";
import { getSessionUser } from "@/utils/getSessionUser";
import Notification from "@/models/notification";

export const POST = async (req, { params }) => {

  const { postId } = params;
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
          postId: post._id
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
          postId:post._id,
          isRead: false,
        });
      }

      return new Response(JSON.stringify({ message: "inc" }), { status: 200 });
    }
  } catch (error) {
    return new Response({ message: error.message }, { status: 500 });
  }
};



