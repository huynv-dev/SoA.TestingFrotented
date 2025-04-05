import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '../ui/section-header';
import { Container } from '../ui/container';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  href: string;
  isMiddle?: boolean;
}

const FeatureCard = ({ title, subtitle, description, imageSrc, href, isMiddle }: FeatureCardProps) => {
  return (
    <div className={`flex flex-col ${isMiddle ? '-mt-8' : ''}`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <span className="text-sm text-orange-500">{subtitle}</span>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <Link 
          href={href}
          className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          Forfait {'>'}
        </Link>
      </div>
    </div>
  );
};

export const FeatureSection = () => {
  const features = [
    {
      title: 'Case sous-titre',
      subtitle: 'Case Title',
      description: 'Chaque sentier vous conduit à des panoramas époustouflants, chaque instant...',
      imageSrc: '/static/images/citrus.png',
      href: '/features/1'
    },
    {
      title: 'Case sous-titre',
      subtitle: 'Case Title',
      description: 'Chez BASIC, la pêche est une alliance entre passion et respect. Imaginez des lacs pois...',
      imageSrc: '/static/images/smoothie.png',
      href: '/features/2'
    },
    {
      title: 'Case sous-titre',
      subtitle: 'Case Title',
      description: 'BASIC vous guide à travers des territoires authentiques, où la chasse est plus quune d...',
      imageSrc: '/static/images/lemons.png',
      href: '/features/3'
    }
  ];

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col items-center mb-12">
          <SectionHeader
            title="TITRE BLOC 1"
            className="mb-4"
          />
          <p className="text-gray-600 text-center text-lg">
            Sous-titre Bloc 1
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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