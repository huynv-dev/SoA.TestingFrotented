'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface PopupInfoCardProps {
  popupRef: React.RefObject<HTMLDivElement>;
  info: any;
  activity: string;
  isZoomed: boolean;
  onClose: () => void;
}

export default function PopupInfoCard({
  popupRef,
  info,
  activity,
  isZoomed,
  onClose
}: PopupInfoCardProps) {
  // 👉 Click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose(); // Reset popup
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupRef, onClose]);

  return (
    <motion.div
      ref={popupRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] z-40"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-[#562C2C]">{activity}</h3>
        {isZoomed && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-orange-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-gray-600 text-sm">{info?.description}</p>

        <div className="border-t border-gray-100 pt-3 space-y-2">
          <InfoRow label="Adresse:" value={info?.address} />
          <InfoRow label="Heures:" value={info?.openHours} />
          <InfoRow label="Téléphone:" value={info?.phone} />
          <RatingRow rating={info?.rating} />

          {info?.activities?.length > 0 && (
            <div className="pt-2">
              <span className="text-[#562C2C] font-medium text-sm block mb-2">Activités disponibles:</span>
              <div className="flex flex-wrap gap-2">
                {info.activities.map((act: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <a
          href={`https://${info?.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full mt-3 px-4 py-2 bg-orange-600 text-white text-center rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
        >
          Visiter le site web
        </a>
      </div>
    </motion.div>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className="text-[#562C2C] font-medium">{label}</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

const RatingRow = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className="text-[#562C2C] font-medium">Note:</span>
    <div className="flex items-center gap-1">
      <span className="text-orange-500">{rating}</span>
      <span className="text-orange-500">★</span>
    </div>
  </div>
);
