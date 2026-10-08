import { useTranslation } from 'react-i18next';
import type { Tech } from '@/data/types';
import { techKey, techLabel } from '@/lib/tech';
import Tag from './Tag';

type TechListProps = { items: Tech[]; label?: string };

export default function TechList({ items, label }: TechListProps) {
  const { t } = useTranslation();
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((tech) => (
        <Tag key={techKey(tech)}>{techLabel(tech, t)}</Tag>
      ))}
    </ul>
  );
}
