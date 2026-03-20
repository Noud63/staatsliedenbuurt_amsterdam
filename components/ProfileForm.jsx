
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
import { mutate } from "swr";

const ProfileForm = () => {
  const { data: session, update } = useSession();

  const name = session?.user?.name;
  const username = session?.user?.username;
  const email = session?.user?.email;

  const router = useRouter();
  const avatarRef = useRef();

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteSelectedImage = () => {
    setAvatar(null);
    avatarRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("avatar", avatar);
    formData.append("userId", session?.user.id);

    if (!avatar) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    try {
      const res = await fetch("/api/editprofile", {
        method: "POST",
        body: formData,
        headers: {
          enctype: "multipart/form-data",
        },
      });

      const result = await res.json();

      // Refresh session - corrected to spread the user object to preserve all user data
      await update({
        ...session,
        user: { ...session.user, avatar: result.avatar },
      });

      if (res.status === 200) {
        setLoading(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
    mutate("/api/getposts");
  };

  // console.log("Avatar:", session.user.avatar);

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="singlepost mx-6 w-full max-w-[620px] rounded-lg bg-white p-4 text-black max-sm:mx-4 max-xsm:mx-2">
        <div className="mb-4 w-full border-b border-gray-400 py-2 text-xl font-semibold">
          Jouw Profiel:
        </div>

        <div className="mb-2">
          <span className="font-semibold">Naam: </span>
          <span className="font-normal">{name}</span>
        </div>

        <div className="mb-2">
          <span className="font-semibold">Gebruikersnaam: </span>
          <span className="font-normal">{username}</span>
        </div>

        <div className="mb-4 border-b border-gray-400 pb-4">
          <span className="font-semibold">Email: </span>
          <span className="font-normal">{email}</span>
        </div>

        <div className="mb-4 flex flex-row justify-between max-xsm:flex-col">
          <div className="flex flex-col max-xsm:w-full">
            <span className="mb-2 font-semibold">Voeg profielfoto toe:</span>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept="image/*"
                ref={avatarRef}
                onChange={(e) => setAvatar(e.target.files[0])}
              />

              {avatar && (
                <div className="mt-2 flex w-full flex-row items-center py-1">
                  {avatar.name}
                  <IoMdCloseCircleOutline
                    size={20}
                    color="red"
                    className="cursor-pointer pt-1"
                    onClick={() => deleteSelectedImage()}
                  />
                </div>
              )}

              {error && (
                <div className="mb-4 mt-4 flex w-full flex-row items-center rounded-md border border-red-700 bg-red-100 px-4 py-3">
                  <IoWarningOutline
                    size={20}
                    color="darkred"
                    className="mr-2"
                  />
                  <span className="text-red-800">
                    {" "}
                    Geen afbeelding geselecteerd!
                  </span>
                </div>
              )}

              <div className="mt-4 flex w-full flex-row gap-1 rounded-lg border border-red-800 bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-900 p-1">
                <button
                  type="submit"
                  className="w-full rounded-md border-2 py-2 tracking-wider text-white"
                >
                  {loading ? "...even geduld" : "Verstuur"}
                </button>
                <Link href="/" className="w-full">
                  <button
                    type="submit"
                    className="w-full rounded-md border-2 py-2 tracking-wider text-white"
                  >
                    Terug
                  </button>
                </Link>
              </div>
            </form>
          </div>

          <div className="mb-16 flex items-center pr-4 max-xsm:mb-4 max-xsm:mt-6 max-xsm:justify-center">
            <Image
              src={
                session?.user?.avatar
                  ? session?.user?.avatar
                  : "/images/defaultAvatar2.png"
              }
              alt=""
              width={50}
              height={50}
              className="h-[60px] w-[60px] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm