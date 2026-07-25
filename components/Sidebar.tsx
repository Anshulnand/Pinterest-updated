"use client"
import React from 'react'
import { HiHome, HiPlus, HiUser } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'

function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreate = () => {
    if (session) {
      router.push('/pin-builder');
    } else {
      signIn();
    }
  };

  const handleProfile = () => {
    if (session?.user?.email) {
      router.push('/' + session.user.email);
    } else {
      signIn();
    }
  };

  return (
    <div className="hidden lg:flex flex-col items-center py-6 gap-6 fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-100 z-40">
      <button
        onClick={() => router.push('/')}
        className="p-3 hover:bg-gray-100 rounded-2xl transition cursor-pointer text-gray-700 hover:text-blue-600"
        title="Home"
      >
        <HiHome className="text-2xl" />
      </button>

      <button
        onClick={handleCreate}
        className="p-3 hover:bg-gray-100 rounded-2xl transition cursor-pointer text-gray-700 hover:text-blue-600"
        title="Create Post"
      >
        <HiPlus className="text-2xl" />
      </button>

      <div className="flex-1"></div>

      <button
        onClick={handleProfile}
        className="p-3 hover:bg-gray-100 rounded-2xl transition cursor-pointer text-gray-700 hover:text-blue-600"
        title="User Profile"
      >
        <HiUser className="text-2xl" />
      </button>
    </div>
  )
}

export default Sidebar
