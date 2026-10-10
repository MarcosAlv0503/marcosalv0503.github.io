import { motion } from 'motion/react';
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
            className={`relative min-h-8 min-w-9 rounded-full px-2 uppercase transition-colors ${
              active ? 'text-bg' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId="language-pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-fg"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{lng}</span>
          </button>
        );
      })}
    </div>
  );
}
