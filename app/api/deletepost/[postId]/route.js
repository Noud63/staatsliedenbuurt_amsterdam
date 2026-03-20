import connectDB from "@/connectDB/database";
import { extractPublicId } from "cloudinary-build-url";
import Post from "@/models/post";
import Comment from "@/models/comment";
import PostLike from "@/models/postLikes";
import CommentLike from "@/models/commentLikes";
import Notification from "@/models/notification";
import { deleteImageFromCloudinary } from "@/utils/deleteImageFromCloudinary";
import { getSessionUser } from "@/utils/getSessionUser";

export const DELETE = async (request, { params }) => {
  console.log("API HIT:", params);
  try {
    await connectDB();

    const { postId } = params;

    console.log("PostId to delete:", postId);

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user?.id || !postId) {
      return new Response(
        JSON.stringify({ message: "You are not authorized to delete a post!" }),
        { status: 401 },
      );
    }

    const post = await Post.findById({_id:postId});
    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    if (post.userId.toString() !== sessionUser.user.id) {
      return new Response(
        JSON.stringify({ message: "Not authorized to delete this post" }),
        { status: 403 },
      );
    }
    // Delete image from cloudinary if exists
    const image = post.images[0];
    if (image) {
      const imageToDelete = image;
      const publicId = extractPublicId(imageToDelete);
      const result = await deleteImageFromCloudinary(publicId);
      console.log(result);
    }

    // Delete post
    const deletedPost = await Post.findOneAndDelete({_id:postId});
    if (!deletedPost) {
      return new Response(
        JSON.stringify({ message: "Post not found or already deleted!" }),
        { status: 404 },
      );
    }
    // delete post likes
    await PostLike.deleteMany({ postId: postId });
    // delete all comments
    await Comment.deleteMany({ postId: postId });
    //delete all comment likes
    await CommentLike.deleteMany({ postId: postId });
    //Delete notifications
   await Notification.deleteMany({postId: postId}); 
 
    
    console.log("Deleted:", deletedPost);

    return new Response(
      JSON.stringify({ message: "Post deleted successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Something went wrong!",
        error: error.message,
      }),
      { status: 500 },
    );
  }
};
