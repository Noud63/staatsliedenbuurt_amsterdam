"use client";
import React, { useState } from "react";
import data from "../../../../data/horeca.json";
import ToggleButton from "@/components/ToggleButton";
import { Mail, Phone, Globe } from "lucide-react";

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
            ? "max-h-[3200px] opacity-100"
            : "max-h-[0px] opacity-0"
        }`}
      >
        <ul className="mb-8 flex list-disc flex-col gap-4 pl-5">
          {cat.items.map((item, index) => (
            <li key={index}>
              <span className="text-xl font-semibold">{item.naam}</span>
              {item.adres && <div>{item.adres}</div>}
              {item.postcode && <div>{item.postcode}</div>}
              {item.telefoon && (
                <div className="flex items-center gap-1">
                  <Phone size={16} />: {item.telefoon}
                </div>
              )}
              {item.email && (
                <div className="flex items-center gap-1">
                  <Mail size={16} />: {item.email}
                </div>
              )}
              {item.website && (
                <div className="flex items-center gap-1">
                  <Globe size={16}/>:{" "}
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
