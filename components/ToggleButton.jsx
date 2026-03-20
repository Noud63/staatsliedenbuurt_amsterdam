import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

const ToggleButton = ({ ID, title, dropDownId, setDropDownId }) => {

  console.log("ID:", ID)

  const toggleDropdown = () => {
    setDropDownId(dropDownId === ID ? null : ID); // Open: when clicked ID is set, cause dropDownId === ID is always false
                                                  // Close: now dropDownId === ID is always true, ID set back to null
  };
  
  return (
    <button
      type="button"
      className="mb-4 flex w-full items-center justify-between rounded-md bg-yellow-700 px-4 py-2 text-base shadow-lg"
      onClick={toggleDropdown}
    >
      <span>- {title}</span>
      <IoIosArrowDown
        color="white"
        size={32}
        className={`${dropDownId === ID ? "rotate-180" : ""} transition-all duration-700 ease-in-out`}
      />
    </button>
  );
};

export default ToggleButton
