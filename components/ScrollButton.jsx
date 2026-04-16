"use client";
import React from "react";
import { ArrowUp } from "lucide-react";

const ScrollButton = ({ scrollToTop }) => {
  return (
    <button
      onClick={scrollToTop}
      className="singlepost fixed bottom-6 right-6 rounded-full border-2 bg-gradient-to-l from-red-950 to-yellow-700 p-2 text-white shadow-lg transition-all duration-300 max-md:p-1"
      aria-label="Scroll to top"
    >
      <ArrowUp size={30} />
    </button>
  );
};

export default ScrollButton;
