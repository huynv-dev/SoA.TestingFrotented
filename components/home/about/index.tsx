import { Container } from '../../ui/container';
import Image from 'next/image';
import type { Picto } from '~/types/api';
import { AboutCard } from './about-card';

interface AboutBasicProps {
  title: string;
  subtitle: string;
  textTitle: string;
  text: string;
  pictos: Picto[];
}

export default function AboutBasic({
  title,
  subtitle,
  textTitle,
  text,
  pictos,
}: AboutBasicProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center mb-[60px]">
          <div>
            <h2 className="text-[#F2542D] text-[32px] md:text-[48px] font-semibold font-poppins leading-[1.2] mb-8">
              {title} <span className="text-[#FF9B7B]">{subtitle}</span>
            </h2>

            <div className="mb-8">
              <h3 className="text-[#562C2C] text-xl font-semibold mb-2">{textTitle}</h3>
              <p className="text-[#562C2C] text-base">{text}</p>
            </div>
          </div>

          <div className="relative aspect-square">
            <Image
              src="/static/images/ice-cream.png"
              alt="Ice cream"
              fill
              className="object-cover rounded-[24px]"
            />
          </div>
        </div>

        {/* Pictos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
          {pictos.map((picto, index) => (
            <AboutCard
              key={index}
              picto={picto}
              isCentered={index === pictos.length - 1 && pictos.length % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
