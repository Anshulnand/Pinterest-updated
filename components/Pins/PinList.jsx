"use client";
import React, { useState, useEffect } from 'react'
import PinItem from './PinItem'; 

function PinList({listOfPins}) {
  const [pins, setPins] = useState(listOfPins);

  useEffect(() => {
    setPins(listOfPins);
  }, [listOfPins]);

  const handleDeletePin = (pinId) => {
    setPins(prev => prev.filter(p => p.id !== pinId));
  }
   
  return (
    <div className='mt-7 px-2 md:px-5
     columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-auto'>
        {pins.map((item,index)=>(
           <PinItem pin={item} key={item.id || index} onDelete={handleDeletePin} />
        ))}
    </div>
  )
}

export default PinList