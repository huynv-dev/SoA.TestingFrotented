"use client";
import * as React from "react";
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  bannerTitles: string[];
  bannerMenu: string[];
}

export default function HeroSection({ bannerTitles, bannerMenu }: HeroSectionProps) {
  return (
    <section className="w-full">
      <div className="relative w-full mt-16" style={{ height: 'calc(100vh - 64px)' }}>
        <Image
          src="/static/images/hero-image.png"
          alt="Hero banner"
          fill
          priority
          className="object-cover"
        />

        {/* Banner Titles */}
        {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
          {bannerTitles.map((title, index) => (
            <h1 key={index} className="text-4xl md:text-6xl font-bold mb-4">
              {title}
            </h1>
          ))}
        </div> */}

        {/* Banner Menu */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-4 md:gap-8">
          {bannerMenu.map((item, index) => (
            <Link
              key={index}
              href="#"
              className="text-white text-lg md:text-xl hover:text-[#F2542D] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div> */}

        {/* Icons container */}
        <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-40 sm:gap-12 lg:gap-80">
          <Link href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative">
            <Image
              src="/static/images/mountant.svg"
              alt="Mountain icon"
              fill
              className="object-contain"
            />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative">
            <Image
              src="/static/images/fishing.svg"
              alt="Fishing icon"
              fill
              className="object-contain"
            />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative">
            <Image
              src="/static/images/dinhvi.svg"
              alt="Location icon"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Chat button */}
        <Link
          href="#"
          className="fixed bottom-5 right-4 md:bottom-[80px] md:right-[70px] w-12 h-12 md:w-16 md:h-16 bg-[#F2542D] rounded-full flex items-center justify-center hover:bg-[#F2542D]/90 transition-colors z-50"
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
  );
}