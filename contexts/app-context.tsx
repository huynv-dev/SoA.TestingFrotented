'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { getPageData } from '@/lib/api';
import type { PageData } from '@/types/api';

type Language = 'en' | 'fr';

interface AppContextType {
  currentLang: Language;
  pageData: PageData | null;
  setLanguageAndRefresh: (lang: Language) => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LANGUAGE_KEY = 'app_language';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      return (saved === 'en' || saved === 'fr') ? saved : 'en';
    }
    return 'en';
  });
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setLanguageAndRefresh = useCallback(async (lang: Language) => {
    try {
      setIsLoading(true);
      
      // Lưu ngôn ngữ mới vào localStorage
      localStorage.setItem(LANGUAGE_KEY, lang);
      
      // Gọi API để lấy data mới
      const newData = await getPageData(lang);
      
      // Cập nhật state
      setCurrentLang(lang);
      setPageData(newData);
    } catch (error) {
      console.error('Error updating language:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        currentLang, 
        pageData, 
        setLanguageAndRefresh,
        isLoading 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 