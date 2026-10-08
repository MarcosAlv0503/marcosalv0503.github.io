import { useTranslation } from 'react-i18next';
import TechList from '@/components/ui/TechList';
import { skillGroups } from '@/data/skills';
import Section from './Section';

export default function Skills() {
  const { t } = useTranslation();

  return (
    <Section id="skills" title={t('skills.title')}>
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {skillGroups.map((group) => {
          const title = t(`skills.groups.${group.id as 'languages'}`);
          return (
            <div key={group.id} className="border-t border-border pt-5">
              <h3 className="mb-4 font-display text-xl font-semibold tracking-tight">{title}</h3>
              <TechList items={group.skills} label={title} />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
