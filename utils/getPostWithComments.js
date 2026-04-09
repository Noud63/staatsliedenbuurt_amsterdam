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
    as: "author",
  },
},
{
  $addFields: {
    author: { $arrayElemAt: ["$author", 0] },
    avatar: { $ifNull: [{ $arrayElemAt: ["$author.avatar", 0] }, null] },
    username: { $ifNull: [{ $arrayElemAt: ["$author.username", 0] }, null] },
    name: { $ifNull: [{ $arrayElemAt: ["$author.name", 0] }, null] },
  },
},
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

  return {
    ...post,
  name: postAuthor?.name ?? null,
  username: postAuthor?.username ?? null,
  avatar: postAuthor?.avatar ?? null,
  comments: comments.length > 0 ? comments : [],
  likedByUser: postLiked,
  };
}
