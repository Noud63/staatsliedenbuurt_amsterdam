"use client";
import { useState } from "react";
import GetArticles from "@/components/GetArticles";

export default function RSSComponent() {
  const [keyWord, setKeyWord] = useState("west");

  return (
    <div className="mt-8 min-h-screen">
      <div className="mx-auto max-w-[620px] px-4 max-xsm:px-2">
        <div className="mb-4 flex justify-center border-b-2 pb-4">
          <h1 className="mb-2 text-4xl font-bold text-white max-xm:text-3xl max-xxsm:text-2xl">
            Staatsliedenbuurt nieuws
          </h1>
        </div>
        <div className="w-full mb-4 flex flex-row gap-2 font-semibold text-yellow-900 max-xsm:flex-col">
          <div className="w-[33%] max-xsm:w-full">
            <button
              className="w-full items-center justify-center rounded-full bg-white px-4 py-2 max-xsm:w-full"
              onClick={() => setKeyWord("staatsliedenbuurt")}
            >
              Staatsliedenbuurt
            </button>
          </div>
          <div className="flex-1 flex flex-row gap-2">
            <button
              className="w-full flex items-center justify-center rounded-full bg-white px-4 py-2 max-xsm:w-full"
              onClick={() => setKeyWord("west")}
            >
              West
            </button>
            <button
              className="w-full flex items-center justify-center rounded-full bg-white px-4 py-2 max-xsm:w-full"
              onClick={() => setKeyWord("amsterdam")}
            >
              Amsterdam
            </button>
          </div>
        </div>
        <GetArticles keyWord={keyWord} />
      </div>
    </div>
  );
}
