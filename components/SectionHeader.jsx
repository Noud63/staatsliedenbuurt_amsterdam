import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="flex justify-center pb-4 text-4xl font-bold  max-xl:text-4xl max-lg:text-3xl max-lg:tracking-normal">
      {title}
    </div>
  );
};

export default SectionHeader;
