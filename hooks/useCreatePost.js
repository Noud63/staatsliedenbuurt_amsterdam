"use client";
import { useState } from "react";
import { createPost, revalidateFeedCache } from "@/lib/posts";

export function useCreatePost({ onSuccess } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitPost = async (formData, images) => {
    const content = formData.get("postContent");

    images.forEach((file) => {
      formData.append("images", file);
    });

    if (images.length === 0 && !content) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    setLoading(true);
    try {
      await createPost(formData);
      onSuccess?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      revalidateFeedCache();
    }
  };

  return { submitPost, loading, error };
}
