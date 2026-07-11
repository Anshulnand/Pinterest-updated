"use client"
import React from 'react'
import { HiHome, HiGlobeAlt, HiViewGrid, HiPlus, HiOutlineBell, HiOutlineChat, HiOutlineCog } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { icon: HiHome, label: 'Home', path: '/' },
    { icon: HiGlobeAlt, label: 'Explore', path: '/' },
  ]

  const bottomItems = [
    { icon: HiOutlineBell, label: 'Notifications' },
    { icon: HiOutlineChat, label: 'Messages' },
    { icon: HiOutlineCog, label: 'Settings' },
  ]

  return (
    <div className="hidden lg:flex flex-col items-center py-6 gap-6 fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(item.path)}
          className="p-3 hover:bg-gray-100 rounded-full transition"
          title={item.label}
        >
          <item.icon className="text-2xl text-gray-700" />
        </button>
      ))}
      
      <div className="flex-1"></div>
      
      {bottomItems.map((item, index) => (
        <button
          key={index}
          className="p-3 hover:bg-gray-100 rounded-full transition"
          title={item.label}
        >
          <item.icon className="text-2xl text-gray-700" />
        </button>
      ))}
    </div>
  )
}

export default Sidebar
