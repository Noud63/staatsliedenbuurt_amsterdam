import { NextResponse } from "next/server";
import connectDB from "@/connectDB/database";
import Comment from "@/models/comment";
import { getSessionUser } from "@/utils/getSessionUser";
import Avatar from "@/models/avatar";
import Notification from "@/models/notification";
import Post from "@/models/post";

export const POST = async (request) => {

  try {

    const sessionUser = await getSessionUser();

    const {
      user: { name, email, image, id, avatar },
    } = sessionUser;

    if (!sessionUser || !sessionUser.user?.id) {
      return new Response("Not authorized!", { status: 401 });
    }

   const { postId, parentId, userId, comment, username } =
      await request.json();

       if (!postId) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }

    await connectDB();

    const newComment = await Comment.create({
      postId,
      parentId: parentId || null,
      userId,
      username,
      comment,
      avatar: avatar,
    });

    await newComment.save();

    // Create notification for the comment owner about the new comment
    const parentComment = await Comment.findById(parentId);
    // Create notification for the post owner about the new comment
    const post = await Post.findById(postId);
    

    if (parentComment && parentComment.userId.toString() !== userId) {
      const note = await Notification.create({
        recipient: parentComment.userId,
        type: "comment",
        post: postId,
        comment: newComment._id,
        sender: userId,
        postId: postId,
      });
      console.log("Comment owner Note:", JSON.stringify("Note:", note, null, 2) );
    }else if(parentId === null && (post && post.userId.toString()) !== userId){
         const postOwnerNote = await Notification.create({
        recipient: post.userId,
        type: "comment",
        post: postId,
        comment: newComment._id,
        sender: userId,
        postId: postId,
      });
    }

    return NextResponse.json(newComment, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating comment", error },
      { status: 500 },
    );
  }
};
