import Image from 'next/image';
import React from 'react'
import { useUser, SignOutButton } from "@clerk/nextjs"
import { useRouter } from 'next/navigation';

function UserInfo({userInfo}) {
    const router=useRouter();
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    
  return (
    <div className='flex flex-col items-center py-8'>
        <div className='relative'>
          <Image src={userInfo.userImage || "/default-avatar.png"}
          alt='userImage'
          width={120}
          height={120}
          className='rounded-full border-4 border-white shadow-lg object-cover'/>
        </div>

        <h2 className='text-3xl font-bold mt-4'>{userInfo.userName}</h2>
        <p className='text-gray-500 text-sm'>{userInfo.email}</p>
        
        {userEmail === userInfo.email ? (
          <div className='flex gap-3 mt-6'>
            <SignOutButton signOutCallback={() => router.push('/')}>
              <button 
                className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-full transition cursor-pointer'
              >
                Logout
              </button>
            </SignOutButton>
          </div>
        ) : null}
    </div>
  )
}

export default UserInfo