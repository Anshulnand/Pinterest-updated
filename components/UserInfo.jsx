import Image from 'next/image';
import React from 'react'
import { signOut,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

function UserInfo({userInfo}) {
    console.log(userInfo);
    const router=useRouter();
    const {data:session}=useSession()
    const onLogoutClick=()=>{
      signOut();
      router.push("/")
    }
  return (
    <div className='flex flex-col items-center py-8'>
        <div className='relative'>
          <Image src={userInfo.userImage}
          alt='userImage'
          width={120}
          height={120}
          className='rounded-full border-4 border-white shadow-lg'/>
        </div>

        <h2 className='text-3xl font-bold mt-4'>{userInfo.userName}</h2>
        <p className='text-gray-500 text-sm'>{userInfo.email}</p>
        
        <div className='flex gap-3 mt-6'>
          <button className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-full transition cursor-pointer'>Share</button>
          {session?.user.email== userInfo.email? <button className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-full transition cursor-pointer'
         onClick={()=>onLogoutClick()}>Logout</button>:null}
      </div>
    </div>
  )
}

export default UserInfo