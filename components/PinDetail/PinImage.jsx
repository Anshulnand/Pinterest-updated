"use client";
import Image from 'next/image'
import React, { useState } from 'react'

function PinImage({pinDetail}) {
  const [imgSrc, setImgSrc] = useState(pinDetail?.image);

  const handleImageError = () => {
    setImgSrc("https://picsum.photos/seed/" + (pinDetail?.id || "fallback") + "/800/1000");
  };

  return (
    <div>
      <Image src={imgSrc || "https://picsum.photos/800/1000"}
      alt={pinDetail?.title || "Pin Image"}
      width={1000}
      height={1000}
      unoptimized
      onError={handleImageError}
      className='rounded-2xl max-h-[600px] object-cover w-full'
      />
    </div>
  )
}

export default PinImage