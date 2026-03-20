
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchPosts(userId) {
  
try {
   if (!apiDomain) {
     return [];
   }
   const url = userId ? `${apiDomain}/getposts/postsByUserId/${userId}` : `${apiDomain}/getposts`; // server component fetch req needs the full url http://localhost:3000/api
   const res = await fetch(url, { cache: "no-store" });
   if (!res.ok) {
     throw new Error("Failed to fetch data!");
   }

   const data = await res.json();

   return data;
} catch (error) {
  console.log(error)
}
 
}

// async function getPostsByUserId(userId) {
//   try {
//     if (!apiDomain) {
//       return [];
//     }
//     const res = await fetch(`${apiDomain}/postsByUserId/${userId}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch data!");
//     }

//     const data = await res.json();

//     console.log("Data:", data)

//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Something went wrong!");
//   }
// }

// async function getSinglepostById(postId) {
//   try {
//     if (!apiDomain) {
//       return [];
//     }
//     const res = await fetch(`${apiDomain}/posts/${postId}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch post ${postId}: ${res.statusText}`);
//     }

//     const data = await res.json();

//     if (!data) {
//       throw new Error(`Post ${postId} not found.`);
//     }

//     return data;
//   } catch (err) {
//     console.error("getSinglepostById failed:", err);
//     throw err;
//   }
// }


// async function getUserInfo(id) {
//   try {
//     const res = await fetch(`${apiDomain}/api/getuserinfo/${id}`);
//     const data = await res.json();
//     console.log("Data:", data);
//     const { name, email, userName, avatar } = data;
//     if (data) {
//       return data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export {
  fetchPosts,
  // getPostsByUserId,
  // getSinglepostById,
  // getUserInfo
};
