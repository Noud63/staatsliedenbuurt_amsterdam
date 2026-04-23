"use client";
import React from "react";
import ScrollButton from "@/components/ScrollButton";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const WestergasMenu = ({ categoryNames }) => {

  const { showScrollButton, scrollToTop, handleScroll } = useScrollVisibility(1000); //Set scrollY threshold to 1000px

  return (
    <>
      <div className="mx-auto mt-2 grid w-full max-w-[620px] grid-cols-2 gap-2 max-md:max-w-full max-xsm:grid-cols-1 border-t-2 pt-4">
        {categoryNames?.map((name, idx) => (
          <div
            key={idx}
            className="cursor-pointer rounded-full bg-white px-4 py-2 text-center text-lg font-semibold text-yellow-900 "
            onClick={() => handleScroll(name)}
          >
            {name}
          </div>
        ))}
      </div>
      {/* Scroll to Top Button */}
      {showScrollButton && <ScrollButton scrollToTop={scrollToTop} />}
    </>
  );
};

export default WestergasMenu;
