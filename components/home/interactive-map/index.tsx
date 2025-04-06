// File: components/home/interactive-map/index.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../../ui/container';
import SectionHeader from '../../ui/section-header';
import ActivityFilterList from './activity-filter-list';
import ActivityPin from './activity-pin';
import PopupInfoCard from './pupup-info-card';
import { createLocationInfo, getActivityPosition } from './map-utils';

interface InteractiveMapProps {
  title: string;
  cases: string[];
}

const DEFAULT_ICONS = [
  '/static/images/mountant-1.svg',
  '/static/images/fishing-1.svg',
  '/static/images/dinhvi-1.svg'
];

export default function InteractiveMap({ title, cases }: InteractiveMapProps) {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [locationInfo] = useState(() => createLocationInfo(cases));
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const filteredLocations = activeFilter ? cases.filter(c => c === activeFilter) : cases;

  const getFocusTransform = () => {
    if (!activeLocation || !containerRef.current || !isZoomed) {
      return { scale: 1, originX: '50%', originY: '50%' };
    }
  
    const container = containerRef.current.getBoundingClientRect();
    const index = cases.indexOf(activeLocation);
    const coords = getActivityPosition(index, cases.length);
  
    return {
      scale: 1.5,
      originX: coords.left,
      originY: coords.top
    };
  };
  const transform = getFocusTransform();
  return (
    <section className="relative py-8 md:py-16 bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: 'url(/static/images/bg-map.png)' }}>
      <div className="absolute inset-0 bg-[#fff6f4] opacity-50 z-[-1]"></div>
      <Container className='z-10'>
        <div className="flex flex-col items-center mb-4 md:mb-10" ref={containerRef}>
          <SectionHeader title={title} className="mb-6" />
          <ActivityFilterList
            cases={cases}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            icons={DEFAULT_ICONS}
          />

          <motion.div animate={transform} transition={{ duration: 1.2, ease: 'easeInOut' }} className="relative w-full rounded-xl overflow-hidden">
            <Image src="/static/images/map.png" alt="map" width={1039} height={536} className="w-full object-cover h-auto min-h-[600px]" />

            {filteredLocations.map((activity, index) => {
              const coords = getActivityPosition(cases.indexOf(activity), cases.length);
              return (
                <ActivityPin
                  key={activity}
                  coords={coords}
                  isActive={activeLocation === activity}
                  icon={DEFAULT_ICONS[index % DEFAULT_ICONS.length]}
                  onClick={() => {
                    setActiveLocation(activity);
                    setIsZoomed(true);
                  }}
                />
              );
            })}
          </motion.div>

          <AnimatePresence>
            {activeLocation && (
              <PopupInfoCard
                popupRef={popupRef as React.RefObject<HTMLDivElement>}
                info={locationInfo[activeLocation]}
                activity={activeLocation}
                isZoomed={isZoomed}
                onClose={() => {
                  setActiveLocation(null);
                  setIsZoomed(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
