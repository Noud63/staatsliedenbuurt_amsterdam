import connectDB from "@/connectDB/database";

import Comment from "@/models/comment";
import { getSessionUser } from "@/utils/getSessionUser";


export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { commentId } = params;

    console.log({ "CommentId": commentId }); 

    const formData = await request.formData();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user.id) {
      return new Response(
        JSON.stringify({ message: "You need to login first or register!" }),
        { status: 401 }
      );
    }

    const content = await formData.get("commentContent");
  
    const commentData = {
      comment: content,
    };

    const updatedPost = await Comment.findByIdAndUpdate(
      {
        _id: commentId,
      },
      { $set: commentData },
      { new: true }
    );

    // console.log("Updated Post:", JSON.stringify(updatedPost, null, 2));  

    return new Response(
      JSON.stringify(updatedPost, { message: "Comment updated successfully!" }, {status: 200}),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Update failed!" }), {
      status: 500,
    });
  }
};
