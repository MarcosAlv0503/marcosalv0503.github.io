import { useCallback, useState } from 'react';

export type Theme = 'dark' | 'light';

const THEME_COLORS: Record<Theme, string> = { dark: '#0A0B0F', light: '#F4F2ED' };

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

/** El tema inicial lo aplica el script inline de index.html antes del primer pintado. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next]);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Almacenamiento no disponible (modo privado): el tema se mantiene solo en esta visita.
    }
    setTheme(next);
  }, []);

  return { theme, toggleTheme };
}
