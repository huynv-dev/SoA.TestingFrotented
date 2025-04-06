import Image from 'next/image';
import { motion } from 'framer-motion';

interface ActivityPinProps {
  coords: { top: string; left: string };
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ActivityPin({ coords, icon, isActive, onClick }: ActivityPinProps) {
  const pinIcon = icon.replace('-1.svg', '-pin.svg').split('/').pop();
  return (
    <div className="absolute" style={{ top: coords.top, left: coords.left }}>
      <motion.button
        whileTap={{ scale: 1.2 }}
        whileHover={{ scale: 1.3 }}
        animate={{ scale: isActive ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        onClick={onClick}
        className={`relative transform -translate-x-1/2 -translate-y-1/2 ${isActive ? 'z-30' : 'z-20'}`}
      >
        <Image
          src={`/static/images/${pinIcon}`}
          alt="pin"
          width={32}
          height={32}
          className="object-contain"
        />
      </motion.button>
    </div>
  );
}