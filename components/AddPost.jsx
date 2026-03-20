"use client";
import React, { useState } from "react";
import AddPostModal from "./AddPostModal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const AddPost = () => {
  const [inView, setInView] = useState(false);

  const t = useTranslations("post");

  const { data: session, status } = useSession();
  const profilePic = session?.user?.avatar;
  // console.log("Profile Picture:", profilePic);

  const name = session?.user?.username;

  const router = useRouter();

  const showAddPostModal = () => {
    if (session?.user) {
      setInView(!inView);
    }
    if (!session?.user) {
      router.push("/login");
    }
  };

  // console.log("Session:", session)

  return (
    <div className="mx-6 mt-4 max-xsm:mx-2 max-md:mx-4">
      <section className="singlepost mx-auto flex w-full max-w-[620px] justify-between rounded-lg bg-white px-4 py-4 max-xsm:py-3">
        <div className="flex w-full flex-row items-center gap-4">
          <Image
            src={profilePic ? profilePic : "/images/defaultAvatar1.png"}
            alt="icon"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[45px] w-[45px] rounded-full"
          />
          <button
            className="flex h-[40px] flex-1 cursor-pointer items-center rounded-full bg-gradient-to-r from-yellow-800 via-yellow-700 to-yellow-800 pl-4 text-white outline-none max-xsm:from-red-950 max-xsm:via-yellow-700 max-xsm:to-red-950"
            onClick={showAddPostModal}
          >
            {session?.user ? (
              <div>
                {t("postiets")}, {name}!
              </div>
            ) : (
              <div>{t("delen")}</div>
            )}
          </button>
        </div>
      </section>
      <AddPostModal inView={inView} setInView={setInView} />
    </div>
  );
};

export default AddPost;
