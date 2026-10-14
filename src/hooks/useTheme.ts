import { useCallback } from 'react';

export type Theme = 'dark' | 'light';

const THEME_COLORS: Record<Theme, string> = { dark: '#0A0B0F', light: '#F4F2ED' };

/** Suscripción a los cambios de tema (`data-theme` en <html>), para `useSyncExternalStore`. */
export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

export const getTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

/**
 * Cambia entre tema claro y oscuro. El tema inicial lo aplica el script inline de index.html y la UI
 * que depende del tema se resuelve en CSS (variantes `dark:`/`light:`), no con estado de React: así el
 * HTML prerenderizado ya es correcto para cualquier tema y la hidratación no cambia nada.
 */
export function useTheme() {
  const toggleTheme = useCallback(() => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next]);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Almacenamiento no disponible (modo privado): el tema se mantiene solo en esta visita.
    }
  }, []);

  return { toggleTheme };
}
