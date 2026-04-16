import React from 'react'
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { FaChrome } from "react-icons/fa";

const FoodAndDrinks = ({ category }) => {
  return (
    <div className="mx-auto mt-6 max-w-[620px] max-md:max-w-full" id={category.category}>
          <h2 className="rounded-md bg-white py-1 pl-2 text-xl font-semibold text-yellow-900">
            {category?.category}
          </h2>
          {category?.businesses?.map((business, idx) => (
            <div key={idx} className="mt-4">
              <h3 className="border-b text-lg font-semibold">
                {business.name}
              </h3>
              <div className="mt-2">{business?.about}</div>
              <div className="mt-2 flex cursor-pointer items-center gap-2">
                <FaChrome />{" "}
                {business?.website ? (
                  <a
                    href={business?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {business?.website}
                  </a>
                ) : (
                  <span>{business?.website}</span>
                )}
              </div>
              <div className="mb-4 flex cursor-pointer items-center gap-2">
                <IoLocationSharp />{" "}
                <a
                  href={business.route}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hier ligt {business.name}
                </a>
              </div>
              {business?.img && (
                <div className="mb-8 mt-2 flex max-h-[200px] max-w-[620px] items-center justify-center overflow-hidden">
                  <Image
                    src={business?.img}
                    alt={business.name}
                    width={620}
                    height={200}
                    className="h-auto max-h-[200px] max-w-[620px] object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
  )
}

export default FoodAndDrinks