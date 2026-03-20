import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: 
      {
        type: String,
      },
    
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//UserSchema.index({ email: 1 }, { unique: true });       // login/sign-up
//UserSchema.index({ username: 1 }, { unique: true });    // profile lookups
UserSchema.index({ createdAt: -1 });                    // sort users by newest


const User = models.User || model("User", UserSchema);

export default User;