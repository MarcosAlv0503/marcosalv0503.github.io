import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? t('theme.toLight') : t('theme.toDark');
  const Icon = theme === 'dark' ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="size-[18px]" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
