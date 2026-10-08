import type { ComponentType, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/icons';
import { profile } from '@/data/profile';
import type { SocialLink } from '@/data/types';
import Section from './Section';

const icons: Record<SocialLink['id'], ComponentType<SVGProps<SVGSVGElement>>> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
};

export default function Links() {
  const { t } = useTranslation();

  return (
    <Section id="links" title={t('links.title')}>
      <ul className="border-t border-border">
        {profile.links.map((link) => {
          const Icon = icons[link.id];
          return (
            <li key={link.id} className="border-b border-border">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-6 sm:gap-6"
              >
                <Icon className="size-6 shrink-0 text-fg-muted transition-colors group-hover:text-accent" />
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {t(`links.${link.id}`)}
                  </span>
                  <span className="block truncate font-mono text-sm text-fg-muted">
                    {link.handle}
                  </span>
                </span>
                <span className="sr-only">{t('links.opensInNewTab')}</span>
                <ArrowUpRightIcon className="size-6 shrink-0 text-fg-muted transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
