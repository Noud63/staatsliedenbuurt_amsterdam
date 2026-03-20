"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import deleteIcon from "../assets/icons/delete.png";
import replace from "../assets/icons/replace.png";
import Image from "next/image";
import { revalidatePostCaches } from "@/utils/revalidatePost";
import { mutatePostCaches } from "@/hooks/usePostActions";
import Spinner from "./Spinner";

const EditPostForm = ({ setShowEditForm, post }) => {
  const [postContent, setPostContent] = useState(post?.postContent);
  const [inputFiles, setInputFiles] = useState({ images: [] });

  const inputFilesRef = useRef(null);
  const textareaRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const postId = post?._id;

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      // Move cursor to end of text
      textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
    }
  }, []);

  const updatedData = {
    postContent,
    images: inputFiles?.images,
  };

  // Open file browser
  const handleUploadImage = () => {
    if (!inputFilesRef.current) return;
    inputFilesRef.current?.click();
  };

  // Add new image file to state
  const handleChange = (event) => {
    if (!event.target.files) return;

    const { files } = event.target;

    const addedImages = [...inputFiles.images];

    for (const file of files) {
      addedImages.push(file);
    }

    setInputFiles((prevState) => ({
      ...prevState,
      images: addedImages,
    }));
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    setLoading(true); // start spinner
    const formData = new FormData(e.target);

    updatedData.images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("postContent", updatedData.postContent);

    try {
      const res = await fetch(`/api/editpost/${post._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to edit post");

      setShowEditForm(false);
      await revalidatePostCaches(postId, post.userId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop spinner
    }
  };

  const deleteSelectedImage = (name) => {
    const newArray = inputFiles.images.filter((img) => img.name !== name);
    setInputFiles((prevState) => ({
      ...prevState,
      images: newArray,
    }));
    inputFilesRef.current.value = "";
  };

  const closeModal = () => {
    setShowEditForm(false);
  };

  const deleteImage = async () => {
    //Optimistic delete image from cached data
    mutatePostCaches(postId, (data) => {
      if (!data) return data;

      // feed cache
      if (Array.isArray(data)) {
        return data.map((p) => (p._id === postId ? { ...p, images: [] } : p));
      }

      // single post cache
      if (data._id === postId) {
        return { ...data, images: [] };
      }

      return data;
    });

    try {
      const res = await fetch(`/api/deleteImage/${post._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.status === 200) {
        console.log(data.message);
        setShowEditForm(false);
        //Revalidate cache
        await revalidatePostCaches(postId, post.userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Adjust the textarea height whenever the comment changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
    }
  }, [postContent]);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex w-full items-center justify-center overflow-y-auto bg-yellow-950/70">
      <div className="editpost mx-4 mt-4 max-h-screen w-full max-w-[500px] overflow-y-auto rounded-lg border border-[#420002] bg-white p-4 shadow-md max-xsm:mx-2">
        <div className="flex items-center justify-between border-b border-black py-4">
          <span className="text-xl font-semibold text-black">Bewerk:</span>
          <div
            className="flex cursor-pointer items-center"
            onClick={closeModal}
          >
            <IoMdCloseCircleOutline size={35} color={"#854d0e"} />
          </div>
        </div>

        <form onSubmit={handleEditPost} className="mt-2 w-full">
          <div className="w-full text-black">
            <textarea
              ref={textareaRef}
              type="text"
              name="postContent"
              defaultValue={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className={`${post?.images[0] ? "min-h-[50px]" : "min-h-[100px]"} w-full resize-none overflow-auto rounded-xl bg-white py-2 pr-10 placeholder-gray-500 outline-none`}
            />
          </div>

          <div className="relative mt-2 h-auto rounded-lg border border-gray-300">
            <div className="h-full w-full overflow-hidden bg-gray-200">
              {post?.images[0] && (
                <Image
                  src={post.images[0]}
                  width={100}
                  height={0}
                  alt=""
                  className="h-full w-full object-cover opacity-50"
                />
              )}
            </div>

            {post?.images[0] ? (
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-row gap-2 p-4 text-center">
                <div className="editbuttons2 flex flex-col gap-2 rounded-lg border border-gray-400 bg-white px-4 pb-4 pt-4">
                  <div className="text-lg font-semibold text-black">
                    Afbeelding:
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="flex w-[120px] max-w-[150px] cursor-pointer items-center justify-center rounded-lg border border-gray-400 bg-white py-1 pr-3 font-semibold text-black shadow-md"
                      onClick={handleUploadImage}
                    >
                      <Image
                        src={replace}
                        width={20}
                        height={20}
                        alt="replace"
                        className="w-auto"
                      />
                      Vervang
                    </div>
                    <div
                      className="flex w-[120px] max-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-400 bg-white py-1 font-semibold text-black shadow-md"
                      onClick={deleteImage}
                    >
                      <Image
                        src={deleteIcon}
                        alt=""
                        width={12}
                        height={12}
                        className="w-auto"
                      />
                      Verwijder
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="editbuttons flex cursor-pointer items-center justify-center rounded-lg border border-gray-400 bg-white px-4 py-2 font-semibold text-black"
                onClick={handleUploadImage}
              >
                Upload afbeelding
              </div>
            )}
          </div>

          <div>
            <input
              multiple
              type="file"
              style={{ display: "none" }}
              ref={inputFilesRef}
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="my-4">
            {inputFiles.images.length > 0 &&
              inputFiles.images.map((img) => (
                <div
                  className="flex w-full flex-col items-center gap-2 py-1"
                  key={img.name}
                >
                  <span className="font-semibold text-black">
                    Geselecteerd :
                  </span>
                  <span className="text-black">{img.name}</span>
                  <IoMdCloseCircleOutline
                    size={30}
                    color="red"
                    className="cursor-pointer pt-1"
                    onClick={() => deleteSelectedImage(img.name)}
                  />
                </div>
              ))}
          </div>

          <div className="mb-8 mt-4 flex w-full justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-yellow-950 via-yellow-700 to-yellow-950 py-4 font-semibold text-white"
            >
              {loading ? (
                <Spinner loading={loading} height={24} width={24} />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;
