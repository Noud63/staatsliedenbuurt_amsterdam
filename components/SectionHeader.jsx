import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="flex justify-center pb-4 text-5xl font-semibold tracking-[.15em] max-xl:text-4xl max-lg:text-3xl max-lg:tracking-normal">
      {title}
    </div>
  );
};

export default SectionHeader;
