import { useMemo, useSyncExternalStore } from 'react';
import { Color } from 'three';
import { subscribeTheme } from '@/hooks/useTheme';

const VARS = ['--accent', '--secondary', '--fg', '--bg'] as const;

function read() {
  const styles = getComputedStyle(document.documentElement);
  return VARS.map((v) => styles.getPropertyValue(v).trim()).join('|');
}

/** Colores del tema activo (tokens CSS) como `THREE.Color`, actualizados al cambiar de tema. */
export function useThemeColors() {
  const key = useSyncExternalStore(subscribeTheme, read);
  return useMemo(() => {
    const [accent, secondary, fg, bg] = key.split('|');
    return {
      accent: new Color(accent),
      secondary: new Color(secondary),
      fg: new Color(fg),
      bg: new Color(bg),
    };
  }, [key]);
}
