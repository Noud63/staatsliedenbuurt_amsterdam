import React from "react";
import AddPost from "@/components/AddPost";
import GetAllPosts from "@/components/GetAllPosts";
import LeesDit from "@/components/LeesDit";
import { fetchPosts } from "@/utils/postsRequest";

export default async function Home() {
  
  const initialData = await fetchPosts(); // Fetch on server

  return (
    <>
      <LeesDit />
      <AddPost />
      <GetAllPosts initialData={initialData}/>
    </>
  );
}

