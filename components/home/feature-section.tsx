import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '../ui/section-header';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import type { Case } from '@/types/api';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  href: string;
  isMiddle?: boolean;
}

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  cases: Case[];
}

const ArrowIcon = () => (
  <span className="relative w-6 h-6 group-hover:text-white">
    <Image
      src="/static/images/arrow-up-blue.svg"
      alt="Arrow"
      width={24}
      height={24}
      className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0"
    />
    <Image
      src="/static/images/arrow-up-white.svg"
      alt="Arrow"
      width={24}
      height={24}
      className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    />
  </span>
);

const FeatureCard = ({ title, subtitle, description, imageSrc, href, isMiddle }: FeatureCardProps) => {
  return (
    <div className={`flex flex-col ${isMiddle ? '' : 'md:mt-10'}`}>
      <div className="relative w-full overflow-hidden mb-4 md:mb-6">
        <div className="aspect-[3/2] md:aspect-square cursor-pointer">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="w-full h-full object-cover rounded-[8px] transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      <div className="mt-2 md:mt-4 flex flex-col space-y-2 md:space-y-4">
        <span className="text-[12px] md:text-[20px] text-primary-500 font-medium">{subtitle}</span>
        <h3 className="text-[16px] md:text-[28px] text-secondary-500 font-medium leading-[20px] md:leading-[32px]">{title}</h3>
        <p className="text-[14px] md:text-[18px] text-secondary-500/80 font-normal leading-[18px] md:leading-[24px]">{description}</p>
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
};

export const FeatureSection = ({ title, subtitle, cases }: FeatureSectionProps) => {
  const features = cases.map(caseItem => ({
    title: caseItem.category,
    subtitle: caseItem.tagline,
    description: caseItem.description,
    imageSrc: `/static/images/default.png`,
    href: `/features/${caseItem.category.toLowerCase().replace(/\s+/g, '-')}`,
  }));

  return (
    <section className="py-8 md:py-16" >
      <Container>
        <div className="flex flex-col items-center mb-6 md:mb-10">
          <SectionHeader
            title={title}
            className="mb-2 md:mb-4"
          />
          <p className="text-[16px] md:text-[24px] text-secondary-500 font-normal leading-[20px] md:leading-[30px] tracking-[0.25px] text-center">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              isMiddle={index === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeatureSection; 