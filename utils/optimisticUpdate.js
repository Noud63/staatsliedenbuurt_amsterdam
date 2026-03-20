//higher-order function => a function that returns another function.
//currentData comes from the KEY in mutate(), mutate("api/getposts" = KEY) or api/getposts/postsByUserId/${post.userId} etc.


// const optimisticDeletePost = (postId) => (currentData) => {
//   if (!currentData) return currentData;
//   console.log("Current:", currentData);
//   // Optimistically delete post
//   return currentData.filter((post) => {
//     return post._id !== postId;
//   });
// };

//  const optimisticCommentLikeUpdate = (commentId) => (currentData) => {
//   if (!currentData) return currentData;
//   // Optimistically update the comment's likes
//   return currentData.map((post) => {
//     return {
//       ...post,
//       comments: post.comments.map((comment) => {
//         if (comment._id === commentId) {
//           return {
//             ...comment,
//             likesCount: comment.likesCount + (comment.likedByUser ? -1 : 1), // if likedbyuser is true -> comment.likesCount - 1 else comment.likesCount + 1
//             likedByUser: !comment.likedByUser, // Toggle like state true/false
//           };
//         }
//         return comment;
//       }),
//     };
//   });
// };

// const optimisticAddComment = (postId, newComment) => (data) => {

//   if (!data || !data.posts) return data;

//   return {
//     ...data,
//     posts: data.map((post) => {
//       if (post.id !== postId) return post;

//       return {
//         ...post,
//         comments: [
//           ...(post.comments || []),
//           {
//             ...newComment,
//             _id: `temp-${Date.now()}`, // temporary id
//             likesCount: 0,
//             createdAt: new Date().toISOString(),
//           },
//         ],
//       };
//     }),
//   };
// };

// const optimisticDeleteComment = (postId, commentId) => (currentData) => {
//   if (!currentData) return currentData;
//   // Optimistically delete post
//   return currentData.map((post) => {
//     if (post._id === postId) {
//       return {
//         ...post,
//         comments: post.comments.filter((comment) => {
//           return comment._id !== commentId;
//         }),
//       };
//     }
//     return post;
//   });
// };

// const optimisticPostLikeUpdate = (postId) => (currentData) => {
//   if (!currentData) return currentData;
//   console.log("Current:", currentData);
//   // Optimistically update the comment's likes
//   return currentData.map((post) => {
//     if (post._id === postId) {
//       return {
//         ...post,
//         likesCount: post.likesCount + (post.likedByUser ? -1 : 1), // if likedbyuser is true -> comment.likesCount - 1 else comment.likesCount + 1
//         likedByUser: !post.likedByUser, // Toggle like state true/false
//       };
//     }
//     return post;
//   });
// };

// // Optimistic update for a single post object
// const optimisticCommentLikeUpdateSinglePost = (commentId) => (currentData) => {
//   if (!currentData) return currentData;

//   return {
//     ...currentData,
//     comments: currentData.comments.map((comment) => {
//       if (comment._id === commentId) {
//         return {
//           ...comment,
//           likesCount: comment.likesCount + (comment.likedByUser ? -1 : 1),
//           likedByUser: !comment.likedByUser,
//         };
//       }
//       return comment;
//     }),
//   };
// };

// // For single post object (modal)
// const optimisticPostLikeUpdateSinglePost = (postId) => (currentData) => {
//   if (!currentData || currentData._id !== postId) return currentData;

//   return {
//     ...currentData,
//     likes: currentData.likes + (currentData.likedByUser ? -1 : 1),
//     likedByUser: !currentData.likedByUser,
//   };
// };

// const optimisticDeleteSinglePost = (postId) => (currentData) => {
//   if (!currentData) return currentData;

//   // If the current post is the one being deleted, return null
//   if (currentData._id === postId) {
//     return null;
//   }

//   // Otherwise, leave it unchanged
//   return currentData;
// };

// // For single post object (modal)
// const optimisticDeleteCommentSinglePost = (commentId) => (currentData) => {
//   if (!currentData) return currentData;

//   return {
//     ...currentData,
//     comments: currentData.comments.filter(
//       (comment) => comment._id !== commentId,
//     ),
//   };
// };

// // For all posts (feed or posts by user id)
// const optimisticCommentEditUpdate =
//   (commentId, newContent) => (currentData) => {
//     if (!currentData) return currentData;

//     return currentData.map((post) => ({
//       ...post,
//       comments: post.comments.map((comment) =>
//         comment._id === commentId
//           ? { ...comment, comment: newContent }
//           : comment,
//       ),
//     }));
//   };

// // For single post view
// const optimisticCommentEditUpdateSinglePost =
//   (commentId, newContent) => (currentData) => {
//     if (!currentData) return currentData;

//     return {
//       ...currentData,
//       comments: currentData.comments.map((comment) =>
//         comment._id === commentId
//           ? { ...comment, comment: newContent }
//           : comment,
//       ),
//     };
//   };

// export {
//   optimisticPostLikeUpdate,
//   optimisticCommentLikeUpdate,
//   optimisticCommentLikeUpdateSinglePost,
//   optimisticDeletePost,
//   optimisticDeleteSinglePost,
//   optimisticDeleteComment,
//   optimisticAddComment,
//   optimisticPostLikeUpdateSinglePost,
//   optimisticDeleteCommentSinglePost,
//   optimisticCommentEditUpdate,
//   optimisticCommentEditUpdateSinglePost,
// };
