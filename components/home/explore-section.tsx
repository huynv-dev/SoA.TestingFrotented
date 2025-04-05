import Button from '../ui/button';
import { Container } from '../ui/container';
import Image from 'next/image';

interface ExploreSectionProps {
  title: string;
  subtitle: string;
  text: string;
  buttonText: string;
}

export default function ExploreSection({ title, subtitle, text, buttonText }: ExploreSectionProps) {
    return (
        <section className="relative py-16 md:py-24 min-h-[700px]">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/static/images/bg-explore.png"
                    alt="Explore background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0" />
            </div>

            <Container className="relative">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="text-[32px] md:text-[48px] font-semibold text-[#562C2C] font-poppins mb-4">
                        {title}
                    </h2>
                    <h3 className="text-[24px] md:text-[32px] text-[#562C2C]/60 font-poppins mb-6">
                        {subtitle}
                    </h3>
                    <p className="text-base text-[#562C2C] mb-8 max-w-[600px] mx-auto">
                        {text}
                    </p>
                    <Button variant="primary">
                        {buttonText}
                    </Button>
                </div>
            </Container>
        </section>
    );
} 