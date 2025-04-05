"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/container';
import { MobileMenu } from './mobile-menu';
import { cn } from '@/lib/utils';
import Button from '../ui/button';
import { LanguageSwitcher } from './language-switcher';

interface HeaderProps {
  className?: string;
  menuItems: string[];
}

export const Header = ({ className, menuItems }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full bg-[#4A3434]',
        className
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">LOGO SAMPLE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item}
                href="#"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-primary-500"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher className="mr-4" />
            <Link href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative flex m-auto">
              <Image
                src="/static/images/mountant.svg"
                alt="Mountain icon"
                width={24}
                height={24}
                className="object-contain"
              />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative  flex m-auto">
              <Image
                src="/static/images/fishing.svg"
                alt="Fishing icon"
                width={24}
                height={24}
                className="object-contain"
              />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative  flex m-auto">
              <Image
                src="/static/images/dinhvi.svg"
                alt="Location icon"
                width={24}
                height={24}
                className="object-contain"
              />
            </Link>
            <Button
              variant="primary"
              size="md"
              className="h-10"
              icon={<Image
                src="/static/images/upright.png"
                alt="Location icon"
                width={20}
                height={20}
                className="object-contain"
              />}
            >
            </Button>
          </div>

          {/* Mobile menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            menuItems={menuItems}
          />
        </div>
      </Container>
    </header>
  );
};