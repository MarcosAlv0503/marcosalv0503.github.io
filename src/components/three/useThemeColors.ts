import { useMemo, useSyncExternalStore } from 'react';
import { Color } from 'three';

const VARS = ['--accent', '--secondary', '--fg', '--bg'] as const;

function read() {
  const styles = getComputedStyle(document.documentElement);
  return VARS.map((v) => styles.getPropertyValue(v).trim()).join('|');
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

/** Colores del tema activo (tokens CSS) como `THREE.Color`, actualizados al cambiar de tema. */
export function useThemeColors() {
  const key = useSyncExternalStore(subscribe, read);
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
