import { useEffect, useState } from 'react';

const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;

/** `true` en cuanto el usuario interactúa con la página (ratón, teclado, rueda, toque o scroll). */
export function useFirstInteraction(): boolean {
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const done = () => {
      setInteracted(true);
      EVENTS.forEach((e) => window.removeEventListener(e, done));
    };
    EVENTS.forEach((e) => window.addEventListener(e, done, { passive: true }));
    return () => EVENTS.forEach((e) => window.removeEventListener(e, done));
  }, []);

  return interacted;
}
