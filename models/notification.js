import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema({
  recipient: { type:Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["like", "comment"], required: true },
  post: { type:Schema.Types.ObjectId, ref: "Post" },
  comment: { type:Schema.Types.ObjectId, ref: "Comment" },
  sender: { type:Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

notificationSchema.index({ recipient: 1, createdAt: -1 }); // latest notifications for a user

const Notification = models.Notification || model("Notification", notificationSchema);
export default Notification;