'use client'

import Image from 'next/image'
import React from 'react'

interface ThumbnailItemProps {
  index: number
  currentIndex: number
  imageUrl: string
  author: string
  onClick: () => void
  isMobile?: boolean
}

export default function ThumbnailItem({
  index,
  currentIndex,
  imageUrl,
  author,
  onClick,
  isMobile = false,
}: ThumbnailItemProps) {
  const isActive = index === currentIndex

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isActive
          ? 'scale-[1.05] z-10 shadow-xl brightness-110'
          : 'opacity-90 hover:opacity-100 hover:scale-[1.01]'
      } ${isMobile ? '' : 'flex-shrink-0'}`}
      style={isMobile ? {} : { width: '150px', minWidth: '150px' }}
    >
      <div className="aspect-square relative w-full">
        <Image
          src={imageUrl}
          alt="thumbnail"
          fill
          className={`object-cover rounded-xl transition-transform duration-300 ${
            isActive ? 'scale-105' : 'hover:scale-105'
          }`}
        />
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 px-3 py-2 flex justify-between items-center text-white text-xs transition-all duration-300 ${
          isActive ? 'bg-black/80' : 'bg-black/60 hover:bg-black/70'
        }`}
      >
        <div className="flex items-center gap-1">
          <Image src="/static/images/instagram.svg" alt="insta" width={14} height={14} />
          {author}
        </div>
        <Image src="/static/images/arrow-up-white.svg" alt="arrow" width={14} height={14} />
      </div>
    </div>
  )
}
