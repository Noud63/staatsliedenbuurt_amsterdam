import connectDB from "@/connectDB/database";
import cloudinary from "@/config/cloudinary";
import User from "@/models/User";
import Avatar from "@/models/avatar";
import { getSessionUser } from "@/utils/getSessionUser";

export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

    const file = formData.get("avatar");

    const userId = formData.get("userId");

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user?.id) {
      return new Response("Unauthorized access", { status: 401 });
    }

    if (!file || !file.type.startsWith("image/")) {
      return new Response("Invalid file type", { status: 400 });
    }

    const profile = {};

    const imageBuffer = await file.arrayBuffer();
    const imageData = Buffer.from(imageBuffer);

    //Convert the image data to base64
    const imageBase64 = imageData.toString("base64");

    let result;

    try {
      //Make request to upload to cloudinary
      result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "nextjs_blog" }
      );
    } catch (uploadError) {
      console.error("Cloudinary upload failed", uploadError);
      return new Response("Image upload failed", { status: 500 });
    }
    
    //Add uploaded images to the post
    profile.image = result.secure_url;

    console.log("Uploaded Image URL:", profile.image);

    const avatar = await Avatar.findOne({userId});

    if (!avatar) {
      await Avatar.create({
        avatar: profile.image,
        userId,
      });
    }

    if (avatar) {
     await Avatar.updateOne(
        { userId },
        {
          $set: {
            avatar: profile.image,
          },
        }
      );
    }

    const user = await User.findOne({_id:userId})

    if (!user) {
      throw new Error("No such user, register first!");
    }

   const updateUser = await User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $set: {
            avatar: profile.image,
          },
        },
        { new: true } // Return the updated document
      );
      console.log("Updated User:", updateUser)

    return new Response(JSON.stringify(updateUser), { status: 200 });
    
  } catch (error) {
    console.log(error);
    return new Response("Failed to add post", { status: 500 });
  }
};
