import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Image from 'next/image';

export default function GalleryPopup({ imageUrl, author, review, date, onClose }) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-xl md:max-w-3xl w-full relative max-w-[95vw]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full">
              <Image src={imageUrl} alt="main image" fill className="object-cover rounded-t-lg" />
            </div>
            <div className="px-6 py-4 bg-white/90 backdrop-blur-md flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-[#0E0E0E]">{author}</h4>
                <p className="text-gray-500 text-sm">{review}</p>
              </div>
              <span className="text-sm text-gray-400">{date}</span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
  