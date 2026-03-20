import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    postContent: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    images: [
      {
        type: String,
      },
    ],
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);

PostSchema.index({ createdAt: -1 });                    // latest posts first
PostSchema.index({ userId: 1, createdAt: -1 });        // posts by user, newest first

const Post = models.Post || model("Post", PostSchema);

export default Post;
