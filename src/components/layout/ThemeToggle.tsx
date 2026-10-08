import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? t('theme.toLight') : t('theme.toDark');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
    >
      {theme === 'dark' ? (
        <SunIcon className="size-[18px]" />
      ) : (
        <MoonIcon className="size-[18px]" />
      )}
    </button>
  );
}
