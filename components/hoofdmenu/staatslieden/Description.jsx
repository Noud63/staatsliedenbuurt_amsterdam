"use client"
import React from "react";

const Description = ({ naam }) => {

return (
    <>
    <div className="text-yellow-800 bg-white font-semibold mt-3 border-b border-yellow-800">{naam.naam[1]}</div>
      <div
        className=" text-yellow-900 overflow-hidden transition-all duration-500"
      >
        {naam.desc}
      </div>
    </>
  );
};

export default Description;
