"use client"
import React, { useState } from 'react'
import { HiHeart, HiOutlineHeart, HiChat, HiUpload, HiDotsHorizontal } from 'react-icons/hi'

function PinActions({ pinDetail }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(54);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <button 
        onClick={handleLike}
        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-full transition"
      >
        {liked ? (
          <HiHeart className="text-2xl text-red-600" />
        ) : (
          <HiOutlineHeart className="text-2xl text-gray-700" />
        )}
        <span className="font-semibold">{likeCount}</span>
      </button>
      
      <button className="hover:bg-gray-100 p-2 rounded-full transition">
        <HiChat className="text-2xl text-gray-700" />
      </button>
      
      <button className="hover:bg-gray-100 p-2 rounded-full transition">
        <HiUpload className="text-2xl text-gray-700" />
      </button>
      
      <button className="hover:bg-gray-100 p-2 rounded-full transition">
        <HiDotsHorizontal className="text-2xl text-gray-700" />
      </button>
    </div>
  )
}

export default PinActions
