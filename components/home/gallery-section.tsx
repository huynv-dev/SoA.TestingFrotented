'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/container';

const thumbnails = [
  {
    img: '/static/images/thumb-avocado.png',
    name: 'Anthony Durand',
    title: 'La famille',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    date: '24 Sep 2024',
  },
  {
    img: '/static/images/thumb-cherries.png',
    name: 'Anthony Durand',
    title: 'Souvenir sucré',
    description: 'Cherries bring back memories of summer. Captured with love.',
    date: '02 Oct 2024',
  },
  {
    img: '/static/images/thumb-mandarin.png',
    name: 'Anthony Durand',
    title: 'Fraîcheur d\'automne',
    description: 'An autumn afternoon in the orchard with mandarins.',
    date: '10 Oct 2024',
  },
  {
    img: '/static/images/thumb-orange.png',
    name: 'Anthony Durand',
    title: 'L\'énergie du matin',
    description: 'Sunrise and citrus — the perfect way to start the day.',
    date: '15 Oct 2024',
  },
];

export default function GallerySection() {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = thumbnails[mainImageIndex];

  // Auto switch image every 1.5s when not hovered and popup is closed
  useEffect(() => {
    if (isHovered || popupOpen) return;

    const interval = setInterval(() => {
      setMainImageIndex((prev) => (prev + 1) % thumbnails.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, popupOpen]);

  return (
    <section className="py-12" style={{ background: 'linear-gradient(0deg, rgba(14, 149, 148, 0.20) 0%, rgba(14, 149, 148, 0.20) 100%)' }}>
      <Container>
        {/* Top */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Lorem ipsum is simply dummy text of the printing and typesetting industry...
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl md:text-3xl font-bold text-[#562C2C]">
              IMMORTALISEZ DES MOMENTS<br />
              INOUBLIABLES AVEC <span className="text-[#FF5733]">#BASIC</span>
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
              src={mainImage.img}
              alt="Main"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {thumbnails.map((item, index) => (
            <div
              key={index}
              onClick={() => setMainImageIndex(index)}
              className={`
                relative overflow-hidden rounded-xl cursor-pointer group transition-all duration-200
                ${mainImageIndex === index ? 'ring-2 ring-offset-2 ring-orange-500 scale-[1.02] z-10' : 'opacity-90'}
              `}
            >
              <div className="aspect-square w-full relative">
                <Image
                  src={item.img}
                  alt={`thumb-${index}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 flex justify-between items-center text-white text-xs group-hover:bg-black/70 transition">
                <div className="flex items-center gap-1">
                  <Image src="/static/images/instagram.svg" alt="insta" width={14} height={14} />
                  {item.name}
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
                {/* Image with aspect ratio */}
                <div className="relative aspect-video w-full">
                  <Image
                    src={mainImage.img}
                    alt="Popup Image"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>

                {/* Caption */}
                <div className="px-6 py-4 bg-white/90 backdrop-blur-md flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#0E0E0E]">{mainImage.title}</h4>
                    <p className="text-gray-500 text-sm">{mainImage.description}</p>
                  </div>
                  <span className="text-sm text-gray-400">{mainImage.date}</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-8">
          Consultez <span className="text-[#0E9594] font-semibold">@BASIC</span> et{' '}
          <span className="text-[#FF5733] font-semibold">#BASIC</span> pour découvrir les expériences inoubliables des pourvoiries
          et activités BASIC.
        </p>
      </Container>
    </section>
  );
}
