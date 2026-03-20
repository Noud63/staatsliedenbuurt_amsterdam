import { getSessionUser } from "@/utils/getSessionUser";
import Notification from "@/models/notification";
import Post from "@/models/post";          // ✅ add this
import Comment from "@/models/comment";    // ✅ add this if you populate comments
import connectDB from "@/connectDB/database";

export const dynamic = "force-dynamic"; //Prevents to statically pre-render the page.

export async function GET(req) {
  try {
    await connectDB();
  const session = await getSessionUser();

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const notifications = await Notification.find({
    recipient: session.user.id,
    isRead: false,
  })
    .populate("post")
    .populate("comment") // mongoose checks the comment value wich is the _id of a comment then looks for that comment in the comments collection and adds the fields to the notification.comment
    .populate("sender", "username name avatar")
    .lean() // Convert to plain JavaScript objects
    .sort({ createdAt: -1 })

    // If more than 9, delete the oldest
    if (notifications && notifications.length > 9) {
      const excess = notifications.slice(9); // notifications 10, 11, 12, etc.
      const excessIds = excess.map((n) => n._id);

      // Delete them from the database
      await Notification.deleteMany({ _id: { $in: excessIds } });
    }

    // Return only the latest 9
    const latestNine = notifications.length > 9 ? notifications.slice(0, 9) : notifications;

  // console.log("Notifications fetched:", JSON.stringify(notifications, null, 2)  );

  return new Response(JSON.stringify({ notifications: latestNine }), { status: 200 });

  } catch (error) {
    console.error("Notification fetch error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }),{ status: 500 });
  }
  
}
