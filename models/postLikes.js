import { Schema, model, models } from "mongoose";

const PostLikeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true },
);

PostLikeSchema.index({ userId: 1, postId: 1 }, { unique: true });
PostLikeSchema.index({ userId: 1 });    

const PostLike = models.PostLike || model("PostLike", PostLikeSchema);
export default PostLike;