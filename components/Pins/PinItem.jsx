"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import UserTag from '../UserTag'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import app from '../../app/Shared/firebaseConfig'
import { HiTrash } from 'react-icons/hi2'

function PinItem({pin, onDelete}) {
  const router=useRouter();
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  const user={
    name:pin?.userName,
    image:pin?.userImage,
  }

  const isOwner = session?.user?.email === pin?.email;

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent opening the pin details
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        setIsDeleting(true);
        const db = getFirestore(app);
        await deleteDoc(doc(db, "pinterest-post", pin.id));
        if (onDelete) {
          onDelete(pin.id);
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert("Failed to delete post.");
        setIsDeleting(false);
      }
    }
  }

  const [imgSrc, setImgSrc] = useState(pin?.image);

  const handleImageError = () => {
    setImgSrc("https://picsum.photos/seed/" + (pin?.id || "fallback") + "/600/800");
  };

  return (
    <div className='relative group'>
       <div className="relative 
       before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-black/30
       transition
       cursor-pointer
       " onClick={()=>router.push("/pin/"+pin.id)}>
       
        <Image src={imgSrc || "https://picsum.photos/600/800"}
        alt={pin.title || 'Pin image'}
        width={500}
        height={500}
        unoptimized
        onError={handleImageError}
        className='rounded-3xl 
        cursor-pointer relative z-0 object-cover w-full h-auto'
        />

        {isOwner && (
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white text-red-600 p-2.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer"
            title="Delete post"
          >
            <HiTrash className="text-xl" />
          </button>
        )}
       </div>
        <h2 className='font-bold 
        text-[18px] mb-1 mt-2 line-clamp-2'>{pin.title}</h2>
        <UserTag user={user} />
    </div>
  )
}

export default PinItem