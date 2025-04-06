'use client';

import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import AutoplayType from 'embla-carousel-autoplay';
import { Container } from '../ui/container';
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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
      slidesToScroll: 1,
      loop: true,
      direction: 'rtl',
    },
    [AutoplayType(autoplayOptions)]
  );

  const caseStudies = cases.map(caseItem => ({
    image: `/static/images/default.png`,
    title: caseItem.category,
    subtitle: caseItem.tagline,
    description: caseItem.description
  }));

  return (
    <section className="py-4 min-h-[600px] max-w-screen overflow-hidden">
      <Container className="relative min-h-[70vh]">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[#F2542D] text-center md:text-left text-[32px] md:text-[48px] line-clamp-1 font-semibold font-poppins uppercase leading-[60px] break-words">{title}</h2>
          {/* Desktop version */}
          <Link
            href="#"
            className="hidden md:flex text-[#666666] text-lg md:text-[20px] font-medium font-poppins capitalize leading-[30px] break-words items-center gap-2 group"
          >
            <span className="group-hover:underline">{moreInfo}</span>
            <Image
              src="/static/images/arrow-right-1.svg"
              alt="arrow right"
              width={24}
              height={24}
              className="inline-block group-hover:underline"
            />
          </Link>


        </div>

        <div className="-mx-4 md:-mx-24" dir="rtl">
          <div className="max-w-screen absolute left-[-40px] pl-6 md:left-[26px] overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {[...caseStudies, ...caseStudies, ...caseStudies].map((study, index) => (
                <div key={index} className="max-w-[250px] md:max-w-[340px] min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%] px-4 md:px-6" dir="ltr">
                  <div className="bg-white cursor-pointer rounded-[8px] overflow-hidden h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-cover rounded-[8px]"
                      />
                    </div>
                    <div className="py-6">
                      <h3 className="text-[#562C2C] text-base font-medium mb-2">{study.title}</h3>
                      <h4 className="text-[#562C2C] text-lg font-semibold mb-3">{study.subtitle}</h4>
                      <p className="ml-2 px-4 border-l-[1px] border-[#BBBBBB ] text-[#562C2C] text-sm">{study.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile version */}
        </div>
        <Link
          href="#"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[340px] md:hidden w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white text-center py-3 px-6 rounded-[100px] text-base font-medium font-poppins transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>{moreInfo}</span>
          <Image 
            src="/static/images/arrow-right-white.svg" 
            alt="arrow right" 
            width={20} 
            height={20}
          />
        </Link>
      </Container>
    </section>
  );
} 