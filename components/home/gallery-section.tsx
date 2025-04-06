'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/container';
import type { Review } from '@/types/api';

const defaultImages = [
  '/static/images/thumb-avocado.png',
  '/static/images/thumb-cherries.png',
  '/static/images/thumb-mandarin.png',
  '/static/images/thumb-orange.png'
];

interface GallerySectionProps {
  title: string;
  text: string;
  reviews: Review[];
  footer: string;
}

export default function GallerySection({ title, text, reviews, footer }: GallerySectionProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = reviews[mainImageIndex];
  const getImageUrl = (index: number) => defaultImages[index % defaultImages.length];

  useEffect(() => {
    if (isHovered || popupOpen) return;
    const interval = setInterval(() => {
      setMainImageIndex((prev) => (prev + 1) % reviews.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, popupOpen, reviews.length]);

  return (
    <section
      className="py-12"
      style={{
        background: 'linear-gradient(180deg, rgba(226, 246, 246, 1) 0%, rgba(226, 246, 246, 0.95) 100%)',
      }}
    >
      <Container>
        {/* Top */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{text}</p>
          </div>
          <div className="text-right flex items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#562C2C] px-4 whitespace-normal">
              {title}
            </h2>
          </div>
        </div>

        {/* Main Image */}
        <div
          className="relative bg-white rounded-xl shadow-lg overflow-hidden mb-8 mx-auto cursor-pointer"
          onClick={() => setPopupOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-video w-full">
            <Image
              src={getImageUrl(mainImageIndex)}
              alt="main image"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Thumbnails Desktop */}
        <div className="hidden md:flex gap-4 md:-mx-4 md:px-4">
          <div className="flex w-max gap-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                onClick={() => setMainImageIndex(index)}
                className={`relative overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-all duration-300 hover:shadow-lg
                  ${mainImageIndex === index 
                    ? 'scale-[1.05] z-10 shadow-xl brightness-110' 
                    : 'opacity-90 hover:opacity-100 hover:scale-[1.01]'
                  }`}
                style={{ width: '150px', minWidth: '150px' }}
              >
                <div className="aspect-square relative w-full">
                  <Image
                    src={getImageUrl(index)}
                    alt="thumbnail image"
                    fill
                    className={`object-cover rounded-xl transition-transform duration-300 ${mainImageIndex === index ? 'scale-105' : 'hover:scale-105'}`}
                  />
                </div>
                <div className={`absolute bottom-0 left-0 right-0 px-3 py-2 flex justify-between items-center text-white text-xs transition-all duration-300
                  ${mainImageIndex === index ? 'bg-black/80' : 'bg-black/60 hover:bg-black/70'}`}>
                  <div className="flex items-center gap-1">
                    <Image src="/static/images/instagram.svg" alt="insta" width={14} height={14} />
                    {review.author}
                  </div>
                  <Image src="/static/images/arrow-up-white.svg" alt="arrow" width={14} height={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnails Mobile */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {reviews.map((review, index) => (
            <div
              key={index}
              onClick={() => setMainImageIndex(index)}
              className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg
                ${mainImageIndex === index 
                  ? 'scale-[1.05] z-10 shadow-xl brightness-110' 
                  : 'opacity-90 hover:opacity-100 hover:scale-[1.01]'
                }`}
            >
              <div className="aspect-square relative w-full">
                <Image
                  src={getImageUrl(index)}
                  alt="thumbnail image"
                  fill
                  className={`object-cover rounded-xl transition-transform duration-300 ${mainImageIndex === index ? 'scale-105' : 'hover:scale-105'}`}
                />
              </div>
              <div className={`absolute bottom-0 left-0 right-0 px-3 py-2 flex justify-between items-center text-white text-xs transition-all duration-300
                ${mainImageIndex === index ? 'bg-black/80' : 'bg-black/60 hover:bg-black/70'}`}>
                <div className="flex items-center gap-1">
                  <Image src="/static/images/instagram.svg" alt="insta" width={14} height={14} />
                  {review.author}
                </div>
                <Image src="/static/images/arrow-up-white.svg" alt="arrow" width={14} height={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        <AnimatePresence>
          {popupOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPopupOpen(false)}
            >
              <motion.div
                className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={getImageUrl(mainImageIndex)}
                    alt="main image"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="px-6 py-4 bg-white/90 backdrop-blur-md flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#0E0E0E]">{mainImage.author}</h4>
                    <p className="text-gray-500 text-sm">{mainImage.review}</p>
                  </div>
                  <span className="text-sm text-gray-400">{mainImage.date}</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-8">{footer}</p>
      </Container>
    </section>
  );
}
