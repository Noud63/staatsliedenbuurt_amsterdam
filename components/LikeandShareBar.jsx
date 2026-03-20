import React from 'react'
import LikeAndShareButtons from './LikeAndShareButtons';

const LikeandShareBar = ({post, onLike}) => {
  return (
    <div className="w-full flex flex-row border-b border-t border-gray-300 py-2 my-4">
      <LikeAndShareButtons post={post} />
    </div>
  );                                                           
}

export default LikeandShareBar
