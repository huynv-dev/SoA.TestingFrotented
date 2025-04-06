import Image from 'next/image';
import Button from '~/components/ui/button';
import Container from '~/components/ui/container';

interface ExploreSectionProps {
  title: string;
  subtitle: string;
  text: string;
  buttonText: string;
}

export default function ExploreSection({ title, subtitle, text, buttonText }: ExploreSectionProps) {
  return (
    <section className="relative py-16 md:py-24 min-h-[700px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/static/images/bg-explore.png"
          alt="Explore background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-10" />
      </div>

      {/* Content */}
      <Container className="relative z-20">
        <div className="max-w-[800px] flex flex-col items-center mx-auto text-center">
          <h2 className="text-[32px] md:text-[48px] font-semibold text-[#562C2C] font-poppins mb-4">
            {title}
          </h2>
          <h3 className="text-[24px] md:text-[32px] text-[#562C2C]/60 font-poppins mb-6">
            {subtitle}
          </h3>
          <p className="text-base text-[#562C2C] mb-8 max-w-[600px] mx-auto">
            {text}
          </p>
          <Button variant="primary">{buttonText}</Button>
        </div>
      </Container>
    </section>
  );
}
