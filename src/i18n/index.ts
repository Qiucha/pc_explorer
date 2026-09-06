import { getUI } from '../content';
import type { Language } from '../types';
import type { UITextContent } from '../content/types';

export type TranslationKeys = UITextContent;

export function getTranslation(lang: Language): TranslationKeys {
  return getUI(lang);
}

