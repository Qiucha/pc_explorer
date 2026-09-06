import { en } from './en';
import { zh } from './zh';
import type { Language } from '../types';

export const dictionaries = {
  en,
  zh
};

export type TranslationKeys = typeof en;

export function getTranslation(lang: Language): TranslationKeys {
  return dictionaries[lang] || dictionaries.en;
}
