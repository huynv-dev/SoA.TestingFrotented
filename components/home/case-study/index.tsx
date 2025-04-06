'use client';

import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Container } from '../../ui/container';
import CaseCard from './case-card';
import type { Case } from '@/types/api';

interface CaseStudyProps {
  title: string;
  moreInfo: string;
  cases: Case[];
}

const autoplayOptions = {
  delay: 1500,
  rootNode: (emblaRoot: any) => emblaRoot.parentElement,
};

export default function CaseStudies({ title, moreInfo, cases }: CaseStudyProps) {
  const [carouselRef] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
      slidesToScroll: 1,
      loop: true,
      direction: 'rtl',
    },
    [Autoplay(autoplayOptions)]
  );

  return (
    <section className="py-4 min-h-[600px] max-w-screen overflow-hidden">
      <Container className="relative min-h-[60vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[#F2542D] text-center md:text-left text-[32px] md:text-[48px] font-semibold font-poppins uppercase leading-[60px] break-words line-clamp-1">
            {title}
          </h2>

          <Link
            href="#"
            className="hidden md:flex items-center gap-2 text-[#666666] text-[20px] font-medium font-poppins capitalize group"
          >
            <span className="group-hover:underline">{moreInfo}</span>
            <Image
              src="/static/images/arrow-right-1.svg"
              alt="arrow right"
              width={24}
              height={24}
              className="group-hover:underline"
            />
          </Link>
        </div>

        {/* Carousel */}
        <div className="-mx-4 md:-mx-24" dir="rtl">
          <div className="max-w-screen absolute left-[-40px] pl-6 md:left-[26px] overflow-hidden" ref={carouselRef}>
            <div className="flex">
              {[...cases, ...cases, ...cases].map((item, index) => (
                <div
                  key={index}
                  className="max-w-[250px] md:max-w-[340px] flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] px-4 md:px-6"
                  dir="ltr"
                >
                  <CaseCard
                    image="/static/images/default.png"
                    title={item.category}
                    subtitle={item.tagline}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <Link
          href="#"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[340px] md:hidden w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white text-center py-3 px-6 rounded-[100px] text-base font-medium font-poppins transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>{moreInfo}</span>
          <Image src="/static/images/arrow-right-white.svg" alt="arrow right" width={20} height={20} />
        </Link>
      </Container>
    </section>
  );
}
