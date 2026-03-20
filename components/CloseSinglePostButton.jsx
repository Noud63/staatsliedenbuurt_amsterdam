import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const CloseSinglePostButton = ({ setPostId }) => {
  return (
    <div className="border-b border-gray-400 px-4 flex justify-between items-center pb-3 pt-1 w-full bg-gradient-to-r from-red-950 via-yellow-700 to-red-950 rounded-t-xl">
      <div className="pt-1 font-CloisterBlack text-4xl text-white">Staatslieden</div>
      <div
        className="mt-2 cursor-pointer flex items-center justify-between rounded-full bg-red-950/0 p-1"
        onClick={setPostId}
      >  
        
        <IoMdCloseCircleOutline size={30} color={"white"} />
      </div>
    </div>
  );
};

export default CloseSinglePostButton;
