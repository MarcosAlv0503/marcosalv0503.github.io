import { useTranslation } from 'react-i18next';

export default function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-transform focus:translate-y-0"
    >
      {t('skipLink')}
    </a>
  );
}
