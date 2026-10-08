import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { IsoDate } from '@/data/types';
import { formatDate } from '@/lib/formatDate';

type TimelineItemProps = { start: IsoDate; end: IsoDate | null; children: ReactNode };

/**
 * Entrada del timeline. En móvil lleva su propia línea a la izquierda;
 * en escritorio el nodo se sitúa sobre el rail global del pipeline.
 */
export default function TimelineItem({ start, end, children }: TimelineItemProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? 'es';

  return (
    <li className="relative border-l border-border pb-14 pl-6 last:pb-0 sm:grid sm:grid-cols-[11.5rem_1fr] sm:gap-8 lg:border-0 lg:pl-0">
      <span
        aria-hidden="true"
        className="absolute top-1.5 -left-[5px] size-[9px] rounded-full border border-fg-muted bg-bg lg:-left-[52px]"
      />
      <p className="mb-2 font-mono text-sm whitespace-nowrap text-fg-muted sm:mb-0 sm:pt-0.5">
        <time dateTime={start}>{formatDate(start, locale)}</time>
        {' – '}
        {end ? <time dateTime={end}>{formatDate(end, locale)}</time> : t('experience.present')}
      </p>
      <div>{children}</div>
    </li>
  );
}
