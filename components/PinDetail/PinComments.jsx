"use client"
import React, { useState } from 'react'
import { HiOutlineEmojiHappy, HiOutlinePhotograph } from 'react-icons/hi'

function PinComments({ pinDetail }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { user: 'Coolboy God', text: 'Amazing pin!' }
  ]);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, { user: 'You', text: comment }]);
      setComment('');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3">{comments.length} comment{comments.length !== 1 ? 's' : ''}</h3>
      
      <div className="space-y-3 mb-4">
        {comments.map((c, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <p className="font-semibold text-sm">{c.user}</p>
              <p className="text-sm text-gray-700">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 border-t pt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddComment();
          }}
          placeholder="Add a comment..."
          className="flex-1 bg-gray-100 focus:bg-white text-gray-800 text-sm px-4 py-2.5 rounded-full outline-none border border-transparent focus:border-blue-500 transition-all"
        />
        <button 
          onClick={handleAddComment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer shrink-0"
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default PinComments
