import { useTranslation } from 'react-i18next';
import Timeline from '@/components/timeline/Timeline';
import TimelineItem from '@/components/timeline/TimelineItem';
import TechList from '@/components/ui/TechList';
import { experience } from '@/data/experience';
import Section from './Section';

export default function Experience() {
  const { t } = useTranslation();

  return (
    <Section id="experience" title={t('experience.title')}>
      <Timeline>
        {experience.map((job) => (
          <TimelineItem key={job.id} start={job.start} end={job.end}>
            <h3 className="font-display text-2xl font-semibold tracking-tight">{job.role}</h3>
            <p className="mt-1 text-fg">{job.company}</p>
            {job.client && (
              <p className="text-sm text-fg-muted">
                {t('experience.client', { client: job.client })}
              </p>
            )}
            <p className="mt-4 max-w-[65ch] leading-relaxed text-fg-muted">
              {t(`experience.items.${job.id as 'loang'}.description`)}
            </p>
            <div className="mt-5">
              <TechList items={job.tech} label={t('experience.techLabel')} />
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
