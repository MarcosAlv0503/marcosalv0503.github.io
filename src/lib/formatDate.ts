import type { IsoDate } from '@/data/types';

/** 'YYYY' → '2023'; 'YYYY-MM' → 'mar 2026' / 'Mar 2026' según el idioma. */
export function formatDate(date: IsoDate, locale: string): string {
  const [year, month] = date.split('-').map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' })
    .format(new Date(year!, month - 1))
    .replace('.', '')
    .replace(' de ', ' ');
}
