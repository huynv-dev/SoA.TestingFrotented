import Image from 'next/image';
import Button from '~/components/ui/button';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  href: string;
  isMiddle?: boolean;
}

const ArrowIcon = () => (
  <span className="relative w-6 h-6 group-hover:text-white">
    <Image
      src="/static/images/arrow-up-blue.svg"
      alt="Arrow blue"
      width={24}
      height={24}
      className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0"
    />
    <Image
      src="/static/images/arrow-up-white.svg"
      alt="Arrow white"
      width={24}
      height={24}
      className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    />
  </span>
);

export default function FeatureCard({
  title,
  subtitle,
  description,
  imageSrc,
  href,
  isMiddle,
}: FeatureCardProps) {
  return (
    <div className={`flex flex-col ${isMiddle ? '' : 'md:mt-10'}`}>
      <div className="relative w-full overflow-hidden mb-4 md:mb-6">
        <div className="aspect-[3/2] md:aspect-square cursor-pointer">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover rounded-[8px] transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className="mt-2 md:mt-4 flex flex-col space-y-2 md:space-y-4">
        <span className="text-primary-500 text-[12px] md:text-[20px] font-medium">{subtitle}</span>
        <h3 className="text-secondary-500 text-[16px] md:text-[28px] font-medium leading-[20px] md:leading-[32px]">
          {title}
        </h3>
        <p className="text-secondary-500/80 text-[14px] md:text-[18px] leading-[18px] md:leading-[24px] font-normal">
          {description}
        </p>
        <Button
          href={href}
          variant="outline"
          size="lg"
          className="w-fit rounded-full group"
          icon={<ArrowIcon />}
        >
          {title}
        </Button>
      </div>
    </div>
  );
}
