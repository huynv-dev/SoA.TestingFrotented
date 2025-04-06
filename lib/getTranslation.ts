import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

const dictionaries: Record<string, any> = {
  en,
  fr,
};

export function getTranslation(locale: string) {
  const dict = dictionaries[locale] || dictionaries.en;
  return function t(path: string): string {
    return path.split('.').reduce((obj, key) => obj?.[key], dict) || '';
  };
}
export function getDictionary(locale: string) {
  return dictionaries[locale] || dictionaries.en;
}
