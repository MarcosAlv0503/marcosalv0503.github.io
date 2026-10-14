import { useTranslation } from 'react-i18next';
import { locales, setLanguage } from '@/i18n';

export default function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage;
  const index = Math.max(
    0,
    locales.findIndex((lng) => lng === current),
  );

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="relative flex items-center rounded-full border border-border p-0.5 font-mono text-xs"
    >
      {/* Indicador que se desliza bajo el idioma activo (los botones miden lo mismo: w-9). */}
      <span
        aria-hidden="true"
        className="absolute top-0.5 bottom-0.5 left-0.5 w-9 rounded-full bg-fg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
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
            className={`relative min-h-8 w-9 rounded-full uppercase transition-colors ${
              active ? 'text-bg' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}
