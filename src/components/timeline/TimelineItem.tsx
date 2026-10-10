import { type ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { IsoDate } from '@/data/types';
import { usePassed } from '@/hooks/usePassed';
import { formatDate } from '@/lib/formatDate';

type TimelineItemProps = { start: IsoDate; end: IsoDate | null; children: ReactNode };

/**
 * Entrada del timeline. En móvil lleva su propia línea a la izquierda;
 * en escritorio el nodo se sitúa sobre el rail global del pipeline.
 * El nodo se enciende cuando la entrada cruza la línea de lectura.
 */
export default function TimelineItem({ start, end, children }: TimelineItemProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? 'es';
  const ref = useRef<HTMLLIElement>(null);
  const active = usePassed(ref);

  return (
    <li
      ref={ref}
      className="relative border-l border-border pb-14 pl-6 last:pb-0 sm:grid sm:grid-cols-[11.5rem_1fr] sm:gap-8 lg:border-0 lg:pl-0"
    >
      <span
        aria-hidden="true"
        className={`absolute top-1.5 -left-[5px] size-[9px] rounded-full border transition-[background-color,border-color,scale] duration-500 lg:-left-[52px] ${
          active ? 'scale-125 border-accent bg-accent' : 'border-fg-muted bg-bg'
        }`}
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
