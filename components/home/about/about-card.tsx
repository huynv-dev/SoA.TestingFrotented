import Image from 'next/image';
import type { Picto } from '~/types/api';

interface AboutCardProps {
  picto: Picto;
  isCentered?: boolean;
}

export function AboutCard({ picto, isCentered }: AboutCardProps) {
  return (
    <div
      className={`flex flex-col items-center text-center ${
        isCentered ? 'col-span-2 md:col-auto' : ''
      }`}
    >
      <div className="w-12 h-12 bg-[#0E9594] rounded-full flex items-center justify-center mb-3">
        <Image
          src="/static/images/respect.svg"
          alt={picto.title}
          width={24}
          height={24}
        />
      </div>
      <h4 className="text-[#562C2C] text-sm font-medium mb-1">{picto.title}</h4>
      <p className="text-[#562C2C] text-xs">{picto.description}</p>
    </div>
  );
}
