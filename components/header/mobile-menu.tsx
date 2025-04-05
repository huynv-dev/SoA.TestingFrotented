'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { NAVIGATION_ITEMS } from './constants';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenu = ({ isOpen, onToggle }: MobileMenuProps) => {
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
        </div>

        <div className="space-y-1 px-2 pb-3 pt-2">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#5A4444]"
              onClick={onToggle}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex items-center gap-4 px-3">
            <Link href="#" className="text-white hover:text-gray-200">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
              </svg>
            </Link>
            <Link href="#" className="text-white hover:text-gray-200">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" fill="currentColor"/>
              </svg>
            </Link>
            <Link href="#" className="text-white hover:text-gray-200">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12.5 11.5V7H11V13H16V11.5H12.5Z" fill="currentColor"/>
              </svg>
            </Link>
            <Link href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F15A2B]">
              <span className="text-lg font-medium text-white">?</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}; 