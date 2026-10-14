import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { useTheme } from '@/hooks/useTheme';

/**
 * Los dos iconos y sus textos están en el HTML y el tema activo decide cuál se ve (variantes
 * `light:`). `hidden` usa display:none, así que el texto del tema inactivo tampoco se anuncia.
 */
export default function ThemeToggle() {
  const { t } = useTranslation();
  const { toggleTheme } = useTheme();
  const icon =
    'absolute size-[18px] transition-[rotate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex size-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <SunIcon className={`${icon} light:-rotate-90 light:opacity-0`} />
      <MoonIcon className={`${icon} rotate-90 opacity-0 light:rotate-0 light:opacity-100`} />
      <span className="sr-only light:hidden">{t('theme.toLight')}</span>
      <span className="sr-only hidden light:inline">{t('theme.toDark')}</span>
    </button>
  );
}
