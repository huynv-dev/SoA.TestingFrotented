import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

const dictionaries: Record<string, any> = {
  en,
  fr,
};

export function getTranslation(locale: string) {
  return dictionaries[locale] || dictionaries.en;
}
