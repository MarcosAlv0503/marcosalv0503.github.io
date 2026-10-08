import { useTranslation } from 'react-i18next';
import { locales, setLanguage } from '@/i18n';

export default function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage;

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="flex items-center rounded-full border border-border p-0.5 font-mono text-xs"
    >
      {locales.map((lng) => {
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            lang={lng}
            onClick={() => setLanguage(lng)}
            aria-pressed={active}
            aria-label={t(`language.${lng}`)}
            className={`min-h-8 min-w-9 rounded-full px-2 uppercase transition-colors ${
              active ? 'bg-fg text-bg' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}
