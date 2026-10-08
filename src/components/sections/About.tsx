import { useTranslation } from 'react-i18next';
import { profile } from '@/data/profile';
import Section from './Section';

export default function About() {
  const { t } = useTranslation();
  const paragraphs = t('about.paragraphs', { returnObjects: true });

  const facts = [
    { term: t('about.facts.location'), value: profile.location },
    { term: t('about.facts.focus'), value: t('about.facts.focusValue') },
    { term: t('about.facts.education'), value: t('about.facts.educationValue') },
  ];

  return (
    <Section id="about" title={t('about.title')}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 text-lg leading-relaxed sm:text-xl lg:col-span-7">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-[62ch]">
              {p}
            </p>
          ))}
        </div>
        <dl className="self-start lg:col-span-4 lg:col-start-9">
          {facts.map(({ term, value }) => (
            <div key={term} className="border-t border-border py-4 last:border-b">
              <dt className="text-sm text-fg-muted">{term}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
