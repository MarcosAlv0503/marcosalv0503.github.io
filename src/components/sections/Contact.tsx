import { useTranslation } from 'react-i18next';
import CopyButton from '@/components/ui/CopyButton';
import { MailIcon, PhoneIcon } from '@/components/ui/icons';
import { profile } from '@/data/profile';
import Section from './Section';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Section id="contact" title={t('contact.title')}>
      <p className="max-w-[55ch] text-lg text-fg-muted sm:text-xl">{t('contact.intro')}</p>

      <div className="mt-10 space-y-8">
        <div>
          <p className="flex items-center gap-2 text-sm text-fg-muted">
            <MailIcon className="size-4" />
            {t('contact.email')}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-display text-[clamp(1.5rem,6vw,3.25rem)] font-bold tracking-tight break-all underline decoration-border decoration-2 underline-offset-8 transition-colors hover:decoration-accent"
            >
              {profile.email}
            </a>
            <CopyButton text={profile.email} />
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm text-fg-muted">
            <PhoneIcon className="size-4" />
            {t('contact.phone')}
          </p>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="mt-2 inline-block font-display text-2xl font-semibold tracking-tight underline decoration-border decoration-2 underline-offset-8 transition-colors hover:decoration-accent sm:text-3xl"
          >
            {profile.phone}
          </a>
        </div>
      </div>
    </Section>
  );
}
