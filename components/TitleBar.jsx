import React from 'react'

const TitleBar = ({title, titleWidth, id}) => {
  return (
    <div className="rounded-lg bg-white py-2 px-2 text-lg text-yellow-900" id={id}>
      <span className={titleWidth ? titleWidth : "font-bold"}>{title}</span>
    </div>
  );
}

export default TitleBar
