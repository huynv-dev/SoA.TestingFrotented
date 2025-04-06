'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  menuItems: string[];
}

export const MobileMenu = ({ isOpen, onToggle, menuItems }: MobileMenuProps) => {
  return (
    <>
      <button
        onClick={onToggle}
        className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <X className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="block h-6 w-6" aria-hidden="true" />
        )}
      </button>

      <div
        className={cn(
          'fixed inset-0 z-50 transform bg-[#4A3434] transition duration-200 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex-1">
            <button
              onClick={onToggle}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Close main menu</span>
              <X className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="space-y-1 px-2 pb-3 pt-2">
          {menuItems.map((item) => (
            <Link
              key={item}
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#5A4444]"
              onClick={onToggle}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}; 