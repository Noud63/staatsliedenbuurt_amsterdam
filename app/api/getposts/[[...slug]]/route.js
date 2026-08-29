import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/lib/auth/getSessionUser";
import mongoose from "mongoose";
import Post from "@/models/post";
import User from "@/models/User";
import Comment from "@/models/comment";
import PostLike from "@/models/postLikes";
import Avatar from "@/models/avatar";
import { postWithComments } from "@/utils/getPostWithComments";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    const currentUserId = sessionUser?.user?.id;

    // Next.js 15 may pass `params` as a Promise in route handlers.
    const resolvedParams = await Promise.resolve(params);
    const userId = resolvedParams?.slug?.[1]; // optional userId from URL

    // Pagination params
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 3;
    const page = searchParams.get("page"); // page for pagination (last post ID from previous page)

    // console.log("Page:", page);

    // Fetch posts filtered by userId if provided
    const query = userId ? { userId: userId } : {};

    // console.log("Query:", query);

    // Page-based pagination: fetch posts older than the page (last post ID from previous page)
    // Check if page id is less than the last post id in the database, if so, fetch posts older than that id
    if (page) {
      query._id = { $lt: new mongoose.Types.ObjectId(page) };
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    //...new Set() removes duplicates, then convert back to array
    const userIds = [...new Set(posts.map((p) => p.userId.toString()))];

    // console.log("User IDs:", userIds);

    const users = await User.find({ _id: { $in: userIds } })
      .select("name username avatar")
      .lean();

    const userMap = Object.fromEntries(
      users.map((user) => [user._id.toString(), user]),
    );
    // console.log("User Map:", userMap);

    //Fetch all posts likes
    const postIds = posts.map((p) => p._id);

    const likes = await PostLike.find({
      postId: { $in: postIds },
      userId: currentUserId,
    }).lean();

    const likedPosts = new Set(likes.map((l) => l.postId.toString()));

    // console.log("Liked Posts:", likedPosts);
    console.log("Likes:", likes);

    const postsWithComments = await Promise.all(
      posts.map((post) =>
        postWithComments(post, currentUserId, userMap, likedPosts),
      ),
    );

  // console.log("Posts with comments:", JSON.stringify(postsWithComments, null, 2));

    return NextResponse.json(postsWithComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching posts", error },
      { status: 500 },
    );
  }
}
