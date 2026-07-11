



"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch,HiBell,HiChat, HiOutlineCamera, HiOutlineMicrophone } from "react-icons/hi";
import app from "./../app/Shared/firebaseConfig";
import { useRouter } from 'next/navigation';

function Header() {
  const { data: session } = useSession();
  const router=useRouter();
  const db = getFirestore(app);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
    saveUserInfo();
  },[session])

  const saveUserInfo=async()=>{
   if (session?.user && session.user.email) {
  await setDoc(doc(db, "user", session.user.email), {
    userName: session.user.name,
    email: session.user.email,
    userImage: session.user.image,
  });
}

  }

  const onCreateClick=()=>{
    if(session)
    {
      router.push('/pin-builder')
    }
    else{
      signIn()
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Update URL query parameter for search
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('search', query);
    } else {
      url.searchParams.delete('search');
    }
    router.push(url.pathname + url.search);
  }

  
  return (
    <div className='flex justify-between 
     gap-3 md:gap-2 items-center p-6'>
        <Image src='/logo.png' alt='logo'
        width={60} height={60} onClick={()=>router.push('/')}
        className='hover:bg-gray-300 p-2
        rounded-full cursor-pointer'/>
        <button className='bg-black
         text-white p-2 px-4 rounded-full
         text-sm font-semibold
          hidden md:block cursor-pointer' onClick={()=>router.push('/')}>Home</button>
        <button className='font-semibold p-2 px-4
         rounded-full text-sm cursor-pointer' 
         onClick={()=>onCreateClick()}>Create</button>
        <div className='bg-[#e9e9e9] p-3 px-6
         gap-3 items-center rounded-full w-full hidden md:flex'>
        <HiSearch className='text-[34px] 
        text-gray-500'/>
        <input type="text" placeholder='Search'
        value={searchQuery}
        onChange={handleSearch}
        className='bg-transparent outline-none w-full text-[25px]' />
        <HiOutlineCamera className='text-[34px] text-gray-500 cursor-pointer hover:bg-gray-300 p-2 rounded-full'/>
        <HiOutlineMicrophone className='text-[34px] text-gray-500 cursor-pointer hover:bg-gray-300 p-2 rounded-full'/>
        </div>
        <HiSearch className='text-[25px] 
        text-gray-500 md:hidden cursor-pointer hover:bg-gray-300 p-2 rounded-full'/>
        <HiBell className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer'/>
       <HiChat className="text-[25px] md:text-[60px] text-gray-500 cursor-pointer" />

{session?.user?.image ? (
  <Image
    src={session.user.image ?? "/default-avatar.png"} // fallback if null
    onClick={() => router.push('/' + (session.user?.email || ''))}
    alt="user-image"
    width={60}
    height={60}
    className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
  />
) : (
  <button
    className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 px-6 rounded-full transition cursor-pointer"
    onClick={() => signIn()}
  >
    Login
  </button>
)}




    </div>
  )
}

export default Header