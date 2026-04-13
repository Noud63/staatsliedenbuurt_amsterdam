import React from "react";
import Image from "next/image";
import westergasfabriek from "@/data/westergasfabriek.json";
import { IoLocationSharp } from "react-icons/io5";
import { FaChrome } from "react-icons/fa";

const WesterGas = () => {
  return (
    <div className="mt-8 px-4 text-white max-md:mt-4 max-sm:mt-4 max-sm:px-4">
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide">
        <div className="px-4 pb-4">Westergasfabriek</div>
      </div>
      {westergasfabriek?.map((item, index) => (
        <div key={index} className="mt-6 max-w-[620px] mx-auto">
          <h2 className="rounded-md bg-white py-1 pl-2 text-xl font-bold text-yellow-900">
            {item.category}
          </h2>
          {item.businesses?.map((business, idx) => (
            <div key={idx} className="mt-4">
              <h3 className="border-b text-lg font-semibold">
                {business.name}
              </h3>
              <div className="mt-2">{business?.about}</div>
              <div className="mt-2 cursor-pointer flex items-center gap-2">
                <FaChrome />{" "}
                <a
                  href={business?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {business?.website}
                </a>
              </div>
              <div className="mb-4 cursor-pointer flex items-center gap-2">
                <IoLocationSharp /> {" "}
                <a
                  href={business.route}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hier ligt {business.name}
                </a>
              </div>
              {business?.img && (
                <div className="mb-8 mt-2 max-h-[200px] max-w-[620px] overflow-hidden flex items-center justify-center">
                  <Image
                    src={business?.img}
                    alt={business.name}
                    width={620}
                    height={400}
                    className="h-auto w-full shadow-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WesterGas;
