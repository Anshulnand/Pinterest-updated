
"use client";
import React, { useState } from 'react'
import UserTag from '../UserTag'
import PinActions from './PinActions'
import PinComments from './PinComments'
import { useSession } from 'next-auth/react'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import app from '../../app/Shared/firebaseConfig'
import { useRouter } from 'next/navigation'
import { HiTrash } from 'react-icons/hi2'

function PinInfo({pinDetail}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const user={
    name:pinDetail.userName,
    email:pinDetail.email,
    image:pinDetail.userImage
  }

  const isOwner = session?.user?.email === pinDetail?.email;
  const hasValidLink = pinDetail?.link && pinDetail.link.trim() !== "" && pinDetail.link !== "#";

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        setIsDeleting(true);
        const db = getFirestore(app);
        await deleteDoc(doc(db, "pinterest-post", pinDetail.id));
        router.push('/');
        router.refresh();
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
        setIsDeleting(false);
      }
    }
  }

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            {pinDetail.category || "General"}
          </span>
          <button 
            onClick={handleSaveToggle}
            className={`px-6 py-2 rounded-full font-semibold transition cursor-pointer text-sm ${
              isSaved
                ? "bg-gray-800 text-white hover:bg-gray-900"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </button>
        </div>
        {isOwner && (
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-full text-sm transition cursor-pointer"
            title="Delete this post"
          >
            <HiTrash className="text-lg" />
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </button>
        )}
      </div>
      
      <h2 className='text-2xl font-bold mb-4'>{pinDetail.title}</h2>
      
      <PinActions pinDetail={pinDetail} />
      
      <div className="mb-4">
        <UserTag user={user} />
      </div>
      
      <p className='text-gray-700 mb-4'>{pinDetail.desc}</p>
      
      <PinComments pinDetail={pinDetail} />
      
      {hasValidLink && (
        <button 
          className='mt-4 p-2.5 bg-gray-100 hover:bg-gray-200 px-6 text-sm font-semibold rounded-full transition-all text-gray-800 self-start cursor-pointer'
          onClick={() => window.open(pinDetail.link.startsWith('http') ? pinDetail.link : `https://${pinDetail.link}`, '_blank')}
        >
          Visit Destination URL
        </button>
      )}
    </div>
  )
}

export default PinInfo
