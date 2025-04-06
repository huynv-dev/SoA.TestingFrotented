'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useEffect } from 'react';

interface LanguageSwitcherProps {
  className?: string;
}
const LOCALES = ['en', 'fr'];
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const [currentLocale, setCurrentLocale] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    if (locale === 'en' || locale === 'fr') {
      setCurrentLocale(locale);
    }
  }, [locale]);

  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'fr' : 'en';
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'flex items-center justify-center px-2 py-1 rounded-full bg-[#F2542D]/10 hover:bg-[#F2542D]/20 transition-colors',
        className
      )}
    >
      <span className={cn(
        'text-sm font-medium px-2 py-0.5 rounded-full transition-colors',
        locale === 'en' ? 'bg-[#F2542D] text-white' : 'text-[#F2542D]'
      )}>
        EN
      </span>
      <span className={cn(
        'text-sm font-medium px-2 py-0.5 rounded-full ml-1 transition-colors',
        locale === 'fr' ? 'bg-[#F2542D] text-white' : 'text-[#F2542D]'
      )}>
        FR
      </span>
    </button>
  );
}
