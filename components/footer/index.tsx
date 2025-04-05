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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {/* Company Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-4">{address.name}</h3>
            <p className="text-sm">{address.phone}</p>
            <p className="text-sm">{address.location}</p>
          </div>

          {/* First Column Links */}
          <div>
            {firstColumnLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="block text-sm mb-3 hover:text-[#F2542D] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Second Column Links */}
          <div>
            {secondColumnLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="block text-sm mb-3 hover:text-[#F2542D] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Third Column Links */}
          <div>
            {thirdColumnLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="block text-sm mb-3 hover:text-[#F2542D] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright and Social Links */}
        <div className="mt-12 pt-6 border-t border-[#5A4444] flex justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} {address.name}</p>
          <SocialLinks />
        </div>
      </Container>
    </footer>
  );
}
