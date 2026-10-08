import type { ReactNode } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import type { SectionId } from '@/data/sections';

type SectionProps = { id: SectionId; title: string; children: ReactNode };

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 py-16 sm:py-24">
      <SectionHeading id={`${id}-title`}>{title}</SectionHeading>
      {children}
    </section>
  );
}
