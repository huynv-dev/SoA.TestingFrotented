'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../../ui/container';
import type { Review } from '@/types/api';
import GalleryPopup from './gallery-popup';
import ThumbnailItem from './thumbnail-item';

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
        background: 'bg-gradient-to-b from-[#e5f6fd] to-white',
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
              <ThumbnailItem
                key={index}
                index={index}
                currentIndex={mainImageIndex}
                imageUrl={getImageUrl(index)}
                author={review.author}
                onClick={() => setMainImageIndex(index)}
              />
            ))}
          </div>
        </div>


        {/* Thumbnails Mobile */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {reviews.map((review, index) => (
            <ThumbnailItem
              key={index}
              index={index}
              currentIndex={mainImageIndex}
              imageUrl={getImageUrl(index)}
              author={review.author}
              onClick={() => setMainImageIndex(index)}
              isMobile
            />
          ))}
        </div>


        {/* Popup Modal */}
        <AnimatePresence>
          {popupOpen && (
            <GalleryPopup
              imageUrl={getImageUrl(mainImageIndex)}
              author={mainImage.author}
              review={mainImage.review}
              date={mainImage.date}
              onClose={() => setPopupOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-8">{footer}</p>
      </Container>
    </section>
  );
}
