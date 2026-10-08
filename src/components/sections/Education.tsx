import { useTranslation } from 'react-i18next';
import Timeline from '@/components/timeline/Timeline';
import TimelineItem from '@/components/timeline/TimelineItem';
import { education } from '@/data/education';
import Section from './Section';

export default function Education() {
  const { t } = useTranslation();

  return (
    <Section id="education" title={t('education.title')}>
      <Timeline>
        {education.map((item) => (
          <TimelineItem key={item.id} start={item.start} end={item.end}>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-balance">
              {t(`education.items.${item.id as 'daw'}.title`)}
              {item.acronym && (
                <span className="ml-2 font-mono text-base font-normal text-fg-muted">
                  ({item.acronym})
                </span>
              )}
            </h3>
            <p className="mt-1 text-fg-muted">{item.center}</p>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
