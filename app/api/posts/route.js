import { NextResponse } from "next/server";
import connectDB from "@/connectDB/database";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/utils/getSessionUser";
import mongoose from "mongoose";
import Post from "@/models/post";
import Comment from "@/models/comment";
import PostLike from "@/models/postLikes";
import Avatar from "@/models/avatar";

export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user.id) {
      return new Response("User ID is required", { status: 401 });
    }

    const {
      user: { name, email, image, id, username, avatar },
      userId,
    } = sessionUser;
    console.log("User:", sessionUser.user);

    const content = formData.get("postContent");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== ""); //prevent error cloudinary

    const postData = {
      postContent: content,
      userId: userId,
      username: username,
      name: name,
      images,
      avatar: avatar,
    };

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      //Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "nextjs_blog" },
      );

      imageUploadPromises.push(result.secure_url);

      //Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      //Add uploaded images to the post
      postData.images = uploadedImages;
    }

    // console.log("Post:", postData);

    const newPost = new Post(postData);
    await newPost.save();

    // console.log(newPost)

    return new Response(JSON.stringify(newPost, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new Response("Failed to add post", { status: 500 });
  }
};

// ✅ Fetch Comments with Nested Replies
export async function GET() {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    const userId = sessionUser?.user?.id;

    // Fetch all posts
    const posts = await Post.find().sort({ createdAt: -1 }).lean();

    // console.log("Posts:", posts)

    // Fetch comments for each post and structure them with nested replies
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.aggregate([
          { $match: { postId: post._id } },

          // Lookup avatar for each comment
          {
            $lookup: {
              from: "avatars",
              localField: "userId", // Match the comment's author
              foreignField: "userId", // Find the user's avatar
              as: "avatar",
            },
          },
          {
            $addFields: {
              avatar: { $arrayElemAt: ["$avatar.avatar", 0] }, // Extract avatar URL
            },
          },

          // GraphLookup to fetch nested replies
          {
            $graphLookup: {
              from: "comments",
              startWith: "$_id",
              connectFromField: "_id",
              connectToField: "parentId",
              as: "replies",
              maxDepth: 5,
            },
          },

          // Add avatar to replies too
          {
            $lookup: {
              from: "avatars",
              localField: "replies.userId",
              foreignField: "userId",
              as: "replyAvatars",
            },
          },
          {
            $addFields: {
              "replies.avatar": { $arrayElemAt: ["$replyAvatars.avatar", 0] },
            },
          },
          // Lookup likes for each comment
          {
            $lookup: {
              from: "commentlikes",
              localField: "_id",
              foreignField: "commentId",
              as: "likes",
            },
          },

          // Add likedByUser field dynamically for the current user
          {
            $addFields: {
              likedByUser: {
                $in: [new mongoose.mongo.ObjectId(userId), "$likes.userId"], // Check if the current user has liked the comment
              },
            },
          },

          { $sort: { createdAt: -1 } },
        ]);

        // ✅ Check if the user liked this post
        const postLike = await PostLike.findOne({
          postId: post._id,
          userId: userId,
        }).lean();

        // ✅ Lookup avatar for the post author
        const postAvatar = await Avatar.findOne({ userId: post.userId }).select(
          "avatar",
        );

        return {
          ...post,
          avatar: postAvatar ? postAvatar.avatar : null, // Post author's avatar
          comments: comments.length > 0 ? comments : [],
          likedByUser: !!postLike, // ✅ user has liked this post?
        };
      }),
    );

    // console.log("Posts with Comments:", JSON.stringify(postsWithComments, null, 2))

    return NextResponse.json(postsWithComments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching posts", error },
      { status: 500 },
    );
  }
}
