import connectDB from "@/connectDB/database";
import { extractPublicId } from 'cloudinary-build-url'
import Post from "@/models/post";
import { getSessionUser } from "@/utils/getSessionUser";
import { deleteImageFromCloudinary } from "@/utils/deleteImageFromCloudinary";


export const DELETE = async (request, {params}) => {
     try {

        await connectDB()

        const { postId } = params

        const post = await Post.findById({_id:postId})

        const imageToDelete = post.images[0]

        const publicId = extractPublicId(imageToDelete);
        const result = await deleteImageFromCloudinary(publicId)
        console.log(result)

        const updatedPost = await Post.findByIdAndUpdate(
          {_id:postId},
          { $pull: { images: imageToDelete } }, // $pull removes the imageToDelete from the images array
          { new: true } // Return the updated document
        );

        console.log("Post:", updatedPost);

    return new Response(
       JSON.stringify({ message: "Image deleted successfully!" }),
       { status: 200 }
     );
        
     } catch (error) {
        return new Response(
          JSON.stringify({ message: "Image deletion failed!" }),
          { status: 500 }
        );
     }
}