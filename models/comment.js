import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
    },
    comment: { type: String, required: true },
    likesCount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

CommentSchema.index({ postId: 1, parentId: 1, createdAt: -1 });
CommentSchema.index({ userId: 1, createdAt: -1 });

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
