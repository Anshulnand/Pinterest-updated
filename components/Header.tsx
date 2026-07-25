



"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useUser, SignInButton, UserButton, useClerk } from "@clerk/nextjs"
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch, HiX } from "react-icons/hi";
import app from "./../app/Shared/firebaseConfig";
import { useRouter } from 'next/navigation';

function Header() {
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const db = getFirestore(app);
  const [searchQuery, setSearchQuery] = useState('');

  const email = user?.primaryEmailAddress?.emailAddress;
  const name = user?.fullName || user?.firstName || "User";
  const userImage = user?.imageUrl || "/default-avatar.png";

  useEffect(() => {
    saveUserInfo();
  }, [user, isSignedIn])

  const saveUserInfo = async () => {
    if (isSignedIn && email) {
      await setDoc(doc(db, "user", email), {
        userName: name,
        email: email,
        userImage: userImage,
      });
    }
  }

  const onCreateClick = () => {
    if (isSignedIn) {
      router.push('/pin-builder')
    } else {
      openSignIn()
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('search', query);
    } else {
      url.searchParams.delete('search');
    }
    router.push(url.pathname + url.search);
  }

  const clearSearch = () => {
    setSearchQuery('');
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    router.push(url.pathname);
  }

  return (
    <div className='flex justify-between gap-4 items-center p-4 md:px-6 lg:ml-20 bg-white sticky top-0 z-30 border-b border-gray-100 shadow-xs'>
        <div 
          className='flex items-center cursor-pointer transition shrink-0' 
          onClick={() => router.push('/')}
        >
          <span className='font-black text-2xl md:text-3xl tracking-tight text-blue-600 hover:text-blue-700 transition whitespace-nowrap'>VisionGrid</span>
        </div>

        <div className="flex items-center gap-2">
          <button className='bg-black text-white p-2.5 px-5 rounded-full text-sm font-semibold shrink-0 hidden md:block cursor-pointer hover:bg-gray-800 transition' onClick={() => router.push('/')}>Home</button>
          <button className='font-semibold p-2.5 px-5 rounded-full text-sm cursor-pointer shrink-0 hover:bg-gray-100 transition' onClick={() => onCreateClick()}>Create</button>
        </div>

        {/* Redesigned Premium Search Bar */}
        <div className='relative flex-1 max-w-2xl hidden md:flex items-center group'>
          <HiSearch className='absolute left-4 text-xl text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none' />
          <input 
            type="text" 
            placeholder='Search visual posts, categories, or keywords...'
            value={searchQuery}
            onChange={handleSearch}
            className='w-full bg-gray-100 focus:bg-white text-gray-800 text-sm font-medium pl-11 pr-10 py-2.5 rounded-full outline-none border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner focus:shadow-none' 
          />
          {searchQuery && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition cursor-pointer"
              title="Clear search"
            >
              <HiX className="text-base" />
            </button>
          )}
        </div>

        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Image
              src={userImage}
              onClick={() => router.push('/' + (email || ''))}
              alt="user-image"
              width={40}
              height={40}
              className="hover:ring-2 hover:ring-blue-500 rounded-full cursor-pointer transition shrink-0 object-cover"
            />
            <UserButton />
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2.5 px-6 rounded-full transition cursor-pointer shrink-0 text-sm shadow-sm">
              Login
            </button>
          </SignInButton>
        )}
    </div>
  )
}

export default Header