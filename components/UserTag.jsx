"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function UserTag({user}) {
    const router = useRouter();
    //const {data:session}=useSession();
    
    const handleUserClick = () => {
      if (user?.email) {
        const encodedEmail = user.email.replace('@', '%40');
        router.push(`/${encodedEmail}`);
      }
    };
    
  return (
    <div className=''>
       {user?
       <div className='flex gap-3 
       items-center cursor-pointer hover:bg-gray-100 p-2 rounded-full transition'
       onClick={handleUserClick}>
       <Image src={user.image} 
       alt='userImage'
       width={45}
       height={45}
       className='rounded-full'/>
       <div>
        <h2 className='text-[14px] font-medium'>{user.name}</h2>
        <h2 className='text-[12px]'>{user.email}</h2>

        </div>
       </div>
       :null}
    </div>
  )
}

export default UserTag