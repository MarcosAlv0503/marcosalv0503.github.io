import { useEffect, useState } from 'react';

// Sin 'scroll': la restauración del scroll al recargar o abrir un ancla también lo dispara y no es
// una interacción del usuario. El scroll con teclado o con la barra llega por keydown/pointerdown.
const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'] as const;

/**
 * `true` en cuanto el usuario interactúa con la página (ratón, teclado, rueda o toque).
 * Con `enabled = false` no registra ningún listener.
 */
export function useFirstInteraction(enabled = true): boolean {
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (!enabled || interacted) return;
    const done = () => setInteracted(true);
    EVENTS.forEach((e) => window.addEventListener(e, done, { passive: true }));
    return () => EVENTS.forEach((e) => window.removeEventListener(e, done));
  }, [enabled, interacted]);

  return interacted;
}
