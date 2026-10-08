import type { TFunction } from 'i18next';
import type { Tech } from '@/data/types';
import type es from '@/locales/es.json';

/** Texto visible de una tecnología: literal o traducido desde `tech.*`. */
export function techLabel(tech: Tech, t: TFunction): string {
  return typeof tech === 'string' ? tech : t(`tech.${tech.i18nKey as keyof typeof es.tech}`);
}

export function techKey(tech: Tech): string {
  return typeof tech === 'string' ? tech : tech.i18nKey;
}
