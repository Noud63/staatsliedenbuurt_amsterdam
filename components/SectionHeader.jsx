import React from 'react'

const SectionHeader = ({ title }) => {
  return (
      <div className="flex justify-center text-5xl font-semibold pb-4 tracking-[.15em] max-lg:tracking-normal max-xl:text-4xl max-lg:text-3xl">{title}</div>
  )
}

export default SectionHeader