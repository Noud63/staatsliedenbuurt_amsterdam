"use client";
import { useState } from "react";
import GetArticles from "@/components/GetArticles";
export default function RSSComponent() {
  const [keyWord, setKeyWord] = useState("west");

  return (
    <div className="mt-8 min-h-screen">
      <div className="mx-auto max-w-[620px] px-4 max-xsm:px-2">
        <div className="mb-4 flex justify-center border-b-2 pb-4">
          <h1 className="mb-2 text-4xl font-bold text-white max-xsm:text-3xl">
            Staatsliedenbuurt nieuws
          </h1>
        </div>
        <div className="mb-4 flex gap-2 font-semibold text-yellow-900">
          <button
            className="flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2"
            onClick={() => setKeyWord("staatsliedenbuurt")}
          >
            Staatsliedenbuurt
          </button>
          <button
            className="flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2"
            onClick={() => setKeyWord("west")}
          >
            West
          </button>
          <button
            className="flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2"
            onClick={() => setKeyWord("amsterdam")}
          >
            Amsterdam
          </button>
        </div>
        <GetArticles keyWord={keyWord} />
      </div>
    </div>
  );
}
