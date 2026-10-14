import type { IsoDate } from '@/data/types';

/**
 * 'YYYY' → '2023'; 'YYYY-MM' → 'mar 2026' / 'Mar 2026'.
 * Los nombres de los meses vienen de los locales (`months`) y no de Intl, para que el HTML
 * prerenderizado en Node y el render del navegador coincidan siempre.
 */
export function formatDate(date: IsoDate, months: readonly string[]): string {
  const [year, month] = date.split('-').map(Number);
  if (!month) return String(year);
  return `${months[month - 1]} ${year}`;
}
