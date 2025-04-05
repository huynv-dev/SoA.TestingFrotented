"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/app-context';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { currentLang, setLanguageAndRefresh, isLoading } = useApp();
  const [error, setError] = useState<string | null>(null);

  const toggleLanguage = async () => {
    setError(null);
    try {
      const newLang = currentLang === 'en' ? 'fr' : 'en';
      await setLanguageAndRefresh(newLang);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to change language';
      
      console.error('Error changing language:', error);
      setError(errorMessage);
      
      // Show error to user (you might want to add a toast/notification system)
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
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
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-full">
          <div className="w-4 h-4 border-2 border-[#F2542D] border-t-transparent rounded-full animate-spin"></div>
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
  );
}; 