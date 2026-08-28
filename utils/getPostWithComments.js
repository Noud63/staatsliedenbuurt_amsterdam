import mongoose from "mongoose";
import Comment from "@/models/comment";
import PostLike from "@/models/postLikes";
import Avatar from "@/models/avatar";

export async function postWithComments(post, currentUserId, userMap, likedPosts) {
  if (!post) return null;

  // Fetch comments with aggregation pipeline
  const comments = await Comment.aggregate([
    { $match: { postId: new mongoose.Types.ObjectId(post._id) } },
    {
      $lookup: {
        from: "avatars",
        localField: "userId",
        foreignField: "userId",
        as: "avatar",
      },
    },
    {
      $addFields: {
        avatar: { $arrayElemAt: ["$avatar.avatar", 0] },
      },
    },
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
    {
  $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    pipeline: [
      {
        $project: {
          name: 1,
          username: 1,
          avatar: 1,
        },
      },
    ],
    as: "author",
  },
},
{
  $set: {
    avatar: { $arrayElemAt: ["$author.avatar", 0] },
    username: { $arrayElemAt: ["$author.username", 0] },
    name: { $arrayElemAt: ["$author.name", 0] },
  },
},
{ $unset: "author" },
    {
      $lookup: {
        from: "commentlikes",
        localField: "_id",
        foreignField: "commentId",
        as: "likes",
      },
    },
    {
      $addFields: {
        likedByUser: {
          $in: [new mongoose.mongo.ObjectId(currentUserId), "$likes.userId"],
        },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  const postAuthor = userMap[post.userId.toString()];
  const postLiked = likedPosts.has(post._id.toString())

  // console.log("Comments:", JSON.stringify(comments, null, 2));

  return {
    ...post,
  name: postAuthor?.name ?? null,
  username: postAuthor?.username ?? null,
  avatar: postAuthor?.avatar ?? null,
  comments: comments.length > 0 ? comments : [],
  likedByUser: postLiked,
  };
}
