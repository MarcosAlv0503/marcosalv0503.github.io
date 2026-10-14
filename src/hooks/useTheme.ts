import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

const THEME_COLORS: Record<Theme, string> = { dark: '#0A0B0F', light: '#F4F2ED' };

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

/** En el prerender y durante la hidratación el tema es 'dark'; después se sincroniza con el real. */
const getServerSnapshot = (): Theme => 'dark';

/** El tema inicial lo aplica el script inline de index.html antes del primer pintado. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next]);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Almacenamiento no disponible (modo privado): el tema se mantiene solo en esta visita.
    }
  }, []);

  return { theme, toggleTheme };
}
