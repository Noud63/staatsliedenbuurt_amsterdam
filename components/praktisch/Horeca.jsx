"use client";
import React, { useState } from "react";
import data from "../../data/horeca.json";
import ToggleButton from "@/components/ToggleButton";

const Horeca = () => {
  const [dropDownId, setDropDownId] = useState(null);

  return data.map((cat) => (
    <div key={cat.title}>
      <ToggleButton
        dropDownId={dropDownId}
        setDropDownId={setDropDownId}
        ID={cat.id}
        title={cat.title}
      />

      <div
        className={`transition-height w-full overflow-hidden duration-700 ease-in-out ${
          dropDownId === cat.id
            ? "max-h-[1170px] opacity-100"
            : "max-h-[0px] opacity-0"
        }`}
      >
        <ul className="mb-8 flex list-disc flex-col gap-4 pl-5">
          {cat.items.map((item, index) => (
            <li key={index}>
              <span className="text-xl font-semibold">{item.naam}</span>
              {item.adres && <div>{item.adres}</div>}
              {item.postcode && <div>{item.postcode}</div>}
              {item.telefoon && <div>T: {item.telefoon}</div>}
              {item.email && <div>E: {item.email}</div>}
              {item.website && (
                <div>
                  Website:{" "}
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.website}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ));
};

export default Horeca;
