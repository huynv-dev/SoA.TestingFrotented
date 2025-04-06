import Link from 'next/link';
import { Container } from '../ui/container';
import SocialLinks from './social-links';
import type { Address, MenuItem } from '@/types/api';

interface FooterProps {
  address: Address;
  links: MenuItem[];
}

export default function Footer({ address, links }: FooterProps) {
  // Split links into three groups for the three columns
  const linksPerColumn = Math.ceil(links.length / 3);
  const firstColumnLinks = links.slice(0, linksPerColumn);
  const secondColumnLinks = links.slice(linksPerColumn, linksPerColumn * 2);
  const thirdColumnLinks = links.slice(linksPerColumn * 2);

  return (
    <footer className="bg-[#4A3434] text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 gap-y-2 md:gap-y-10">
          {/* Company Info */}
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-semibold text-lg md:mb-4">{address.name}</h3>
            <p className="text-base md:text-lg text-white font-normal font-poppins leading-6 break-words">{address.phone}</p>
            <p className="text-base md:text-lg text-white font-normal font-poppins leading-6 break-words my-2">{address.location}</p>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-3">
            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
              {/* First Column Links */}
              <div className="text-center md:text-left">
                {firstColumnLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    className="block text-base md:text-lg text-white/60 font-normal font-poppins mb-3 hover:text-[#F2542D] transition-colors break-words"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Second Column Links */}
              <div className="text-center md:text-left">
                {secondColumnLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    className="block text-base md:text-lg text-white/60 font-normal font-poppins mb-3 hover:text-[#F2542D] transition-colors break-words"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Third Column Links */}
              <div className="text-center md:text-left">
                {thirdColumnLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    className="block text-base md:text-lg text-white/60 font-normal font-poppins mb-3 hover:text-[#F2542D] transition-colors break-words"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links for Mobile */}
            <div className="mt-8 flex justify-center lg:hidden">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Copyright and Social Links */}
        <div className="mt-12 pt-6 border-t border-[#5A4444] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm md:text-lg text-white font-normal font-poppins break-words text-center">&copy; {new Date().getFullYear()} {address.name}</p>
          {/* Social Links for Desktop */}
          <div className="hidden lg:block">
            <SocialLinks />
          </div>
        </div>
      </Container>
    </footer>
  );
}
