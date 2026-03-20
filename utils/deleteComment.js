export const deleteComment = async (commentId, reactionId = null) => {
  try {
    const url = reactionId
      ? `/api/deleteCommentOrReaction/${commentId}/${reactionId}`
      : `/api/deleteCommentOrReaction/${commentId}`;

    const res = await fetch(url, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error:", data.message);
      return { success: false, message: data.message };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error deleting comment/reaction:", error);
    return { success: false, message: "Something went wrong!" };
  }
};
