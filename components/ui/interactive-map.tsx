'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/section-header';
import Container from '../ui/container';
import { X } from 'lucide-react';

interface InteractiveMapProps {
    title: string;
    cases: string[];
}

// Sử dụng một icon mặc định cho tất cả các hoạt động
const DEFAULT_ICONS = [
    '/static/images/mountant-1.svg',
    '/static/images/fishing-1.svg',
    '/static/images/dinhvi-1.svg'
];

// Tạo vị trí động dựa trên index
const getActivityPosition = (index: number, total: number) => {
    // Tính toán vị trí dựa trên index và tổng số hoạt động
    const angle = (index / total) * 2 * Math.PI; // Góc trong vòng tròn
    const radius = 30; // Bán kính từ trung tâm (%)
    const centerX = 50; // Trung tâm X (%)
    const centerY = 50; // Trung tâm Y (%)
    
    // Tính toán vị trí X, Y trên vòng tròn
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    return { top: `${y}%`, left: `${x}%` };
};

export default function InteractiveMap({ title, cases }: InteractiveMapProps) {
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mapWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !(popupRef.current as HTMLElement).contains(e.target as Node)) {
                setActiveLocation(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredLocations = activeFilter
        ? cases.filter(activity => activity === activeFilter)
        : cases;

    const getFocusTransform = () => {
        if (!activeLocation || !containerRef.current || !isZoomed) {
            return { scale: 1, x: 0, y: 0 };
        }

        const container = containerRef.current.getBoundingClientRect();
        const activityIndex = cases.indexOf(activeLocation);
        const coords = getActivityPosition(activityIndex, cases.length);
        
        const x = parseFloat(coords.left) / 100 * container.width;
        const y = parseFloat(coords.top) / 100 * container.height;
        const offsetX = container.width / 2 - x;
        const offsetY = container.height / 2 - y;
        
        return {
            scale: 1.5,
            x: offsetX,
            y: offsetY,
        };
    };

    const handlePinClick = (activity: string) => {
        setActiveLocation(activity);
        setIsZoomed(true);
    };

    const handleResetZoom = () => {
        setIsZoomed(false);
        setActiveLocation(null);
    };

    const transform = getFocusTransform();

    return (
        <section className="relative py-8 md:py-16 bg-cover bg-center bg-no-repeat min-h-screen"
            style={{ backgroundImage: 'url(/static/images/bg-map.png)' }}>
            <div className="absolute inset-0 bg-[#fff6f4] opacity-50"></div>
            <Container>
                <div className="flex flex-col items-center mb-4 md:mb-10">
                    <div className="relative w-full mx-auto" ref={containerRef}>
                        <SectionHeader
                            title={title}
                            className="mb-4 md:mb-6"
                        />
                        
                        {/* Activity Buttons */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6">
                            {cases.map((activity, index) => (
                                <button
                                    key={activity}
                                    className={`border rounded-[40px] px-4 sm:px-6 py-1.5 sm:py-2 transition flex items-center justify-center sm:justify-start gap-2 sm:gap-3 ${
                                        activeFilter === activity ? 'bg-orange-600 border-orange-600' : 'border-orange-300'
                                    } ${index === cases.length - 1 ? 'col-span-2 sm:col-auto max-w-[200px] mx-auto sm:max-w-none sm:mx-0' : ''}`}
                                    onClick={() => setActiveFilter(activity === activeFilter ? null : activity)}
                                >
                                    <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0">
                                        <Image
                                            src={DEFAULT_ICONS[index % DEFAULT_ICONS.length]}
                                            alt={activity}
                                            height={20}
                                            width={20}
                                            className={`object-contain transition-colors ${
                                                activeFilter === activity ? 'brightness-0 invert' : ''
                                            }`}
                                        />
                                    </div>
                                    <span
                                        className={`font-poppins text-[16px] sm:text-[20px] font-medium leading-[16px] sm:leading-[20px] capitalize ${
                                            activeFilter === activity ? 'text-white' : 'text-[#562C2C]'
                                        }`}
                                        style={{ wordWrap: 'break-word' }}
                                    >
                                        {activity}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Map Container */}
                        <div className="relative rounded-xl overflow-hidden">
                            {/* Trademark Badge */}
                            <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 md:px-4 md:py-2 flex items-center gap-1 md:gap-2 shadow-md">
                                <div className="relative w-4 h-4 md:w-6 md:h-6">
                                    <Image
                                        src="/static/images/sample-badge.svg"
                                        alt="Sample Badge"
                                        height={20}
                                        width={20}
                                        className="object-contain"
                                    />
                                </div>
                                <span
                                    className="font-poppins text-[14px] md:text-[20px] font-medium leading-[14px] md:leading-[20px]"
                                    style={{
                                        color: '#562C2C',
                                        wordWrap: 'break-word',
                                        textShadow: '0px 0px 8px rgba(0, 0, 0, 0.10)'
                                    }}
                                >
                                    Location
                                </span>
                            </div>

                            <motion.div
                                ref={mapWrapperRef}
                                className="relative w-full h-auto"
                                animate={transform}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                            >
                                <Image
                                    src="/static/images/map.png"
                                    alt="Interactive Map"
                                    width={1039}
                                    height={536}
                                    className="w-full object-cover h-auto min-h-[600px]"
                                />

                                {filteredLocations.map((activity, index) => {
                                    const coords = getActivityPosition(cases.indexOf(activity), cases.length);
                                    return (
                                        <div key={activity} className="absolute" style={{ top: coords.top, left: coords.left }}>
                                            <motion.button
                                                whileTap={{ scale: 1.2 }}
                                                whileHover={{ scale: 1.3 }}
                                                animate={{
                                                    scale: activeLocation === activity ? 1.6 : 1,
                                                    transition: { type: 'spring', stiffness: 180, damping: 22 },
                                                }}
                                                onClick={() => handlePinClick(activity)}
                                                className={`relative transform -translate-x-1/2 -translate-y-1/2 ${activeLocation === activity ? 'z-30' : 'z-20'}`}
                                            >
                                                <Image
                                                    src={`/static/images/${DEFAULT_ICONS[index % DEFAULT_ICONS.length].split('/').pop()?.replace('-1.svg', '-pin.svg')}`}
                                                    alt={activity}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            </motion.button>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            {/* Fixed Location Info Popup */}
                            <AnimatePresence>
                                {activeLocation && (
                                    <motion.div
                                        ref={popupRef}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-[250px] max-w-[300px] z-40"
                                    >
                                        <h3 className="text-lg font-semibold mb-2">{activeLocation}</h3>
                                        <p className="text-gray-600 mb-4">Experience our {activeLocation.toLowerCase()} activities</p>
                                        {isZoomed && (
                                            <button
                                                onClick={handleResetZoom}
                                                className="w-full flex items-center justify-center gap-2 text-[#562C2C] hover:text-orange-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                                <span className="text-sm font-medium">Reset View</span>
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
