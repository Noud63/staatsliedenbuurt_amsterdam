import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import { getSessionUser } from "@/lib/auth/getSessionUser";
import Post from "@/models/post";
import User from "@/models/User";
import PostLike from "@/models/postLikes";
import { postWithComments } from "@/utils/getPostWithComments";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { postId } = await params;
    const sessionUser = await getSessionUser();
    const currentUserId = sessionUser?.user?.id;

    const post = await Post.findById(postId).lean();

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const author = await User.findById(post.userId)
      .select("name username avatar")
      .lean();

    console.log("Author:", author);

    const userMap = author
      ? // The author's ID as the key and the author object as the value.{'69c7c7715e7cc003af7f8670': {author}} +> { userId: userObject}
        { [author._id.toString()]: author }
      : {};

    //  console.log("User Map:", userMap);

    const likes = currentUserId
      ? await PostLike.find({
          postId: post._id,
          userId: currentUserId,
        }).lean()
      : [];

    const likedPosts = new Set(likes.map((like) => like.postId.toString()));

    const postComments = await postWithComments(
      post,
      currentUserId,
      userMap,
      likedPosts,
    );

    return NextResponse.json(postComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching post", error },
      { status: 500 },
    );
  }
}
