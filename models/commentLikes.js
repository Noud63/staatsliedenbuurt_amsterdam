import { Schema, model, models } from "mongoose";
const CommentLikeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // for cleanup
  },
  { timestamps: true },
);

CommentLikeSchema.index({ userId: 1, commentId: 1 }, { unique: true });
CommentLikeSchema.index({ userId: 1 });

const CommentLike = models.CommentLike || model("CommentLike", CommentLikeSchema);
export default CommentLike;
