'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  bannerTitles: string[]
  bannerMenu: string[]
}

const iconList = [
  { src: '/static/images/mountant.svg', alt: 'Mountain icon' },
  { src: '/static/images/fishing.svg', alt: 'Fishing icon' },
  { src: '/static/images/dinhvi.svg', alt: 'Location icon' },
]

export default function HeroSection({ bannerTitles, bannerMenu }: HeroSectionProps) {
  return (
    <section className="w-full">
      <div className="relative w-full mt-16 h-[calc(100vh-64px)]">
        {/* Background image */}
        <Image
          src="/static/images/hero-image.png"
          alt="Hero banner"
          fill
          priority
          className="object-cover"
        />

        {/* Icon navigation */}
        <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex items-center gap-8 sm:gap-12 md:gap-40 lg:gap-80">
          {iconList.map((icon, index) => (
            <Link
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                fill
                className="object-contain"
              />
            </Link>
          ))}
        </div>

        {/* Chat floating button */}
        <Link
          href="#"
          className="fixed z-50 bottom-5 right-4 md:bottom-[80px] md:right-[70px] w-12 h-12 md:w-16 md:h-16 bg-[#F2542D] rounded-full flex items-center justify-center hover:bg-[#F2542D]/90 transition-colors"
        >
          <div className="relative w-6 h-6 md:w-8 md:h-8">
            <Image
              src="/static/images/chat.svg"
              alt="Chat"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>
    </section>
  )
}
