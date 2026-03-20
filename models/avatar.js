import { Schema, model, models } from "mongoose";

const AvatarSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

AvatarSchema.index({ userId: 1 })

const Avatar = models.Avatar || model("Avatar", AvatarSchema);

export default Avatar;
