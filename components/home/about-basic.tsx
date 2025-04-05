import { Container } from '../ui/container';
import Image from 'next/image';
import type { Picto } from '@/types/api';

interface AboutBasicProps {
    title: string;
    subtitle: string;
    textTitle: string;
    text: string;
    pictos: Picto[];
}

export default function AboutBasic({ title, subtitle, textTitle, text, pictos }: AboutBasicProps) {
    return (
        <section className="py-16 md:py-24">
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center mb-[60px]">
                    <div>
                        <h2 className="text-[#F2542D] text-[32px] md:text-[48px] font-semibold font-poppins leading-[1.2] mb-8">
                            {title}{' '}
                            <span className="text-[#FF9B7B]">{subtitle}</span>
                        </h2>

                        <div className="mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-[#562C2C] text-xl font-semibold">{textTitle}</h3>
                                    <p className="text-[#562C2C] text-base">
                                        {text}
                                    </p>
                                </div>
                            </div>
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

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
                    {pictos.map((picto, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col items-center text-center ${
                                index === pictos.length - 1 && pictos.length % 2 === 1 
                                    ? 'col-span-2 md:col-auto' 
                                    : ''
                            }`}
                        >
                            <div className="w-12 h-12 bg-[#0E9594] rounded-full flex items-center justify-center mb-3">
                                <Image
                                    src={`/static/images/respect.svg`}
                                    alt={picto.title}
                                    width={24}
                                    height={24}
                                    className="text-white"
                                />
                            </div>
                            <h4 className="text-[#562C2C] text-sm font-medium mb-1">{picto.title}</h4>
                            <p className="text-[#562C2C] text-xs">{picto.description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
} 