"use client";
import React, { useState, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { IoWarningOutline } from "react-icons/io5";
import { mutate } from "swr";

const AddPostModal = ({ inView, setInView }) => {
  const [newFiles, setNewFiles] = useState({ images: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const t = useTranslations("schrijfbericht");

  const router = useRouter();
  const imageRef = useRef(null);

  const closeModal = () => {
    setInView(false);
    setNewFiles({ images: [] });
  };

  const handleChange = (e) => {
    const { files } = e.target;
    const addedImages = [...newFiles.images];

    for (const file of files) {
      addedImages.push(file);
    }
    setNewFiles((prevState) => ({
      ...prevState,
      images: addedImages,
    }));
  };

  const deleteSelectedImage = (name) => {
    const newArray = newFiles.images.filter((img) => img.name !== name);
    setNewFiles((prevState) => ({
      ...prevState,
      images: newArray,
    }));
    imageRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    const content = formData.get("postContent");
    console.log(content);

    newFiles.images.forEach((file) => {
      formData.append("images", file);
    });


    if (newFiles.images.length === 0 && !content) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      if (res.status === 200) {
        closeModal();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
     mutate("/api/getposts");
  };

  return (
    inView && (
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex w-full items-center justify-center overflow-y-auto bg-yellow-950/70">
        <div className="postmodal mx-4 mt-4 max-h-screen w-full max-w-[500px] overflow-y-auto rounded-lg bg-white p-4 shadow-md max-xsm:mx-2">
          <div className="flex w-full flex-row items-center justify-between border-b border-gray-300 pb-2">
            <div className="text-lg font-semibold">{t('bericht')}</div>
            <div className="cursor-pointer" onClick={closeModal}>
              <IoMdCloseCircleOutline size={35} color={"#854d0e"} />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              name="postContent"
              id="content"
              cols="30"
              rows="10"
              className="mt-4 w-full border border-gray-300 p-2 outline-none"
              // required
            />

            <span className="pb-2">{t('afbeelding')}</span>

            <div className="mt-2">
              <input
                multiple
                type="file"
                ref={imageRef}
                // id="images"
                // name="images"
                accept="image/*"
                onChange={handleChange}
              />

              <div className="text-md mb-2 mt-2 border-b border-gray-300 pb-2">
                {newFiles.images.length > 0
                  ? `${newFiles.images.length} bestand(en) geselecteerd.`
                  : ""}
              </div>
            </div>

            <div className="mb-4">
              {newFiles.images.length > 0
                ? newFiles.images.map((img) => (
                    <div
                      className="flex w-full flex-row items-center py-1"
                      key={img.name}
                    >
                      {img.name}
                      <IoMdCloseCircleOutline
                        size={20}
                        color="red"
                        className="cursor-pointer pt-1"
                        onClick={() => deleteSelectedImage(img.name)}
                      />
                    </div>
                  ))
                : ""}
            </div>

            {error && (
              <div className="mb-4 flex w-full flex-row items-center rounded-md border border-red-700 bg-red-100 px-4 py-3">
                <IoWarningOutline size={20} color="darkred" className="mr-2" />
                <span className="text-red-800">
                  {" "}
                  {t('error')}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-gradient-to-r from-yellow-950 via-yellow-700 to-yellow-950 py-3 text-lg text-white"
            >
              {loading ? <span>....even geduld!</span> : <span>{t('verstuur')}</span>}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddPostModal;
