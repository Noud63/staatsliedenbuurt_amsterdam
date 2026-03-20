"use client";
import React, { useState } from "react";
import data from "../../data/haltestramlijn19.json";
import ToggleButton from "../ToggleButton";

const AlleHaltesTram19 = () => {
  const [dropDownId, setDropDownId] = useState(false);


  return (
    <div className="relative mb-12">
      {data.map((cat) => (
        <div key={cat.title}>
          <ToggleButton
            dropDownId={dropDownId}
            setDropDownId={setDropDownId}
            ID={cat.id}
            title={cat.title}
          />
          <div
            className={`transition-height w-full overflow-hidden duration-700 ease-in-out ${
              dropDownId === cat.id ? "h-[650px] opacity-100" : "h-0 opacity-0"
            }`}
          >
            <ul className="list-disc pl-8">
              {cat.items.map((item, index) => (
                <li key={index}>
                  <span className="">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlleHaltesTram19;
