import type { Case } from '@/types/api';
import Container from '~/components/ui/container';
import SectionHeader from '~/components/ui/section-header';
import FeatureCard from './card';

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  cases: Case[];
}

export const FeatureSection = ({ title, subtitle, cases }: FeatureSectionProps) => {
  const features = cases.map((caseItem) => ({
    title: caseItem.category,
    subtitle: caseItem.tagline,
    description: caseItem.description,
    imageSrc: `/static/images/default.png`,
    href: `/features/${caseItem.category.toLowerCase().replace(/\s+/g, '-')}`,
  }));

  return (
    <section className="py-8 md:py-16">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center mb-6 md:mb-10">
          <SectionHeader title={title} className="mb-2 md:mb-4" />
          <p className="text-secondary-500 text-center text-[16px] md:text-[24px] leading-[20px] md:leading-[30px] tracking-[0.25px] font-normal">
            {subtitle}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} isMiddle={index === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeatureSection;
