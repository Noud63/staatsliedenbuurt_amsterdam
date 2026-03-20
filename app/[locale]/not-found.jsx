import React from 'react'
import Link from 'next/link'
import { FaExclamationTriangle } from "react-icons/fa"

const notFoundPage = () => {
  return (
    <section className="flex-grow">
      <div className="container m-auto max-w-2xl py-8">
        <div className="singlepost m-4 mb-4 rounded-md border-2 border-dotted border-yellow-400 px-6 py-24 shadow-md md:m-0">
          <div className="flex justify-center">
            <FaExclamationTriangle className="fas fa-exclamation-triangle fa-5x text-8xl text-yellow-400" />
          </div>
          <div className="text-center">
            <h1 className="mb-8 mt-4 text-2xl font-bold text-yellow-400">
              Pagina niet gevonden!
            </h1>
            <Link
              href="/"
              className="rounded bg-black px-6 py-4 font-bold text-yellow-400"
            >
              Terug
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default notFoundPage
