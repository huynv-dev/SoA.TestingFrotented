"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getPageData } from '@/lib/api';

interface LanguageSwitcherProps {
  className?: string;
}

const LANGUAGE_KEY = 'app_language';

function LanguageSwitcherContent({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentLang, setCurrentLang] = useState<'en' | 'fr'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial language from URL or localStorage
  useEffect(() => {
    try {
      const langParam = searchParams.get('lang');
      if (langParam === 'en' || langParam === 'fr') {
        setCurrentLang(langParam);
        localStorage.setItem(LANGUAGE_KEY, langParam);
      } else {
        const savedLang = localStorage.getItem(LANGUAGE_KEY);
        if (savedLang === 'en' || savedLang === 'fr') {
          setCurrentLang(savedLang);
          // Sync URL with saved language
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set('lang', savedLang);
          router.replace(`${pathname}?${newParams.toString()}`);
        }
      }
    } catch (error) {
      console.error('Error loading initial language:', error);
    }
  }, [searchParams, router, pathname]);

  const toggleLanguage = async () => {
    setError(null);
    try {
      setIsLoading(true);
      const newLang = currentLang === 'en' ? 'fr' : 'en';
      
      // Gọi API để lấy data mới
      await getPageData(newLang);
      
      // Lưu ngôn ngữ mới vào localStorage
      localStorage.setItem(LANGUAGE_KEY, newLang);
      
      // Cập nhật URL và state
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('lang', newLang);
      
      // Cập nhật state trước
      setCurrentLang(newLang);
      
      // Sau đó mới cập nhật URL và refresh
      router.push(`${pathname}?${newParams.toString()}`);
      
      // Đợi một chút để đảm bảo state đã được cập nhật
      await new Promise(resolve => setTimeout(resolve, 100));
      router.refresh();

    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to change language';
      
      console.error('Error changing language:', error);
      setError(errorMessage);
      
      // Show error to user
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Suspense>
      <button
        onClick={toggleLanguage}
        disabled={isLoading}
        className={cn(
          'flex items-center justify-center px-2 py-1 rounded-full bg-[#F2542D]/10 hover:bg-[#F2542D]/20 transition-colors',
          isLoading && 'opacity-50 cursor-not-allowed',
          error && 'border-red-500',
          className
        )}
        title={error || undefined}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50">
            <div className="w-4 h-4 border-2 border-[#F2542D] border-t-transparent animate-spin"></div>
          </div>
        )}
        <span className={cn(
          'text-sm font-medium px-2 py-0.5 rounded-full transition-colors',
          currentLang === 'en' ? 'bg-[#F2542D] text-white' : 'text-[#F2542D]'
        )}>
          EN
        </span>
        <span className={cn(
          'text-sm font-medium px-2 py-0.5 rounded-full ml-1 transition-colors',
          currentLang === 'fr' ? 'bg-[#F2542D] text-white' : 'text-[#F2542D]'
        )}>
          FR
        </span>
      </button>
    </Suspense>
  );
}

// Fallback component khi đang loading
function LanguageSwitcherFallback({ className }: LanguageSwitcherProps) {
  return (
    <div className={cn(
      'flex items-center justify-center px-2 py-1 bg-[#F2542D]/10',
      className
    )}>
      <div className="w-4 h-4 border-2 border-[#F2542D] border-t-transparent animate-spin"></div>
    </div>
  );
}

// Export wrapped component với Suspense
export function LanguageSwitcher(props: LanguageSwitcherProps) {
  return (
    <Suspense fallback={<LanguageSwitcherFallback {...props} />}>
      <LanguageSwitcherContent {...props} />
    </Suspense>
  );
} 