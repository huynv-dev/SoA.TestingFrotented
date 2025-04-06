import Image from 'next/image';

interface CaseCardProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function CaseCard({ image, title, subtitle, description }: CaseCardProps) {
  return (
    <div className="bg-white cursor-pointer rounded-[8px] overflow-hidden h-full">
      <div className="relative aspect-[4/3]">
        <Image src={image} alt={title} fill className="object-cover rounded-[8px]" />
      </div>
      <div className="py-6">
        <h3 className="text-[#562C2C] text-base font-medium mb-2">{title}</h3>
        <h4 className="text-[#562C2C] text-lg font-semibold mb-3">{subtitle}</h4>
        <p className="ml-2 px-4 border-l-[1px] border-[#BBBBBB] text-[#562C2C] text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
