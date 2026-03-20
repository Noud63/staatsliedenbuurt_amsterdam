import connectDB from "@/connectDB/database";
import Notification from "@/models/notification";
import { getSessionUser } from "@/utils/getSessionUser";

export const DELETE = async () => {
    try {   
        await connectDB();

        const sessionUser = await getSessionUser(); 
        if (!sessionUser || !sessionUser.user?.id) {
            return new Response(
                JSON.stringify({ message: "You are not authorized to delete notifications!" }),
                { status: 401 },
            );
        }   
        const userId = sessionUser.user.id;

        await Notification.deleteMany({ recipient: userId });
        return new Response(
            JSON.stringify({ message: "All notifications deleted successfully." }),
            { status: 200 },
        );  
    } catch (error) {
        console.error("Error deleting notifications:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 },
        );  
    }   
}