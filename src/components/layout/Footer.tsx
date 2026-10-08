import { useTranslation } from 'react-i18next';
import { ArrowUpIcon } from '@/components/ui/icons';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-fg-muted sm:px-8">
        <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-fg"
        >
          <ArrowUpIcon className="size-4" />
          {t('footer.backToTop')}
        </a>
      </div>
    </footer>
  );
}
