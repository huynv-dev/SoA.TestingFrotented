import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import type { Language, Translations } from '~/types/i18n';
import { useCallback } from 'react';
const translationsMap: Record<Language, Translations> = {
  en,
  fr,
};

export function useTranslation(language: Language = 'en') {
  const translations = translationsMap[language] || translationsMap.en;

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return value ?? key;
  }, [language]);

  return { t, language };
}
