
//No api route needed for shared url, you can directly fetch from the database
import connectDB from "@/connectDB/database";
import Post from "@/models/post";
import { notFound } from "next/navigation";
import Avatar from '@/models/avatar';
import SharedPost from '@/components/SharedPost';

const SharedPostPage = async ({ params }) => {
  await connectDB();

  const { postId } = params;

  const post = await Post.findById({ _id: postId }).lean();

  if (!post) return notFound();

  const avatar = await Avatar.findOne({ userId: post.userId }).lean();

  post.avatar = avatar ? avatar.avatar : "/images/defaultAvatar.png";
  const sharedPost = JSON.parse(JSON.stringify(post));

  return <SharedPost sharedPost={sharedPost} />;
};

export default SharedPostPage
