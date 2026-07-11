
import React from 'react'
import UserTag from '../UserTag'
import PinActions from './PinActions'
import PinComments from './PinComments'

function PinInfo({pinDetail}) {
  const user={
    name:pinDetail.userName,
    email:pinDetail.email,
    image:pinDetail.userImage
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <select className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold outline-none">
          <option>wallpapers</option>
          <option>design</option>
          <option>photography</option>
        </select>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition">
          Save
        </button>
      </div>
      
      <h2 className='text-2xl font-bold mb-4'>{pinDetail.title}</h2>
      
      <PinActions pinDetail={pinDetail} />
      
      <div className="mb-4">
        <UserTag user={user} />
      </div>
      
      <p className='text-gray-700 mb-4'>{pinDetail.desc}</p>
      
      <PinComments pinDetail={pinDetail} />
      
      <button className='mt-4 p-2 bg-gray-100 px-5 text-sm
      rounded-full hover:bg-gray-200 transition-all'
      onClick={()=>window.open(pinDetail.link)}>Open Url</button>
    </div>
  )
}

export default PinInfo
