"use client";
import { useSession } from "next-auth/react";

const useCurrentUserProfile = () => {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    userId: session?.user?.id ?? null,
    username: session?.user?.username ?? null,
    name: session?.user?.name ?? null,
    avatar: session?.user?.avatar ?? null,
  };
};

export default useCurrentUserProfile;