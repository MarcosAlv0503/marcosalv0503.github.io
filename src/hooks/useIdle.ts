import { useEffect, useState } from 'react';

/** `true` cuando la página ha cargado y el navegador está libre (requestIdleCallback). */
export function useIdle(timeout = 2000): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let handle: number | undefined;
    const done = () => setIdle(true);
    const schedule = () => {
      handle =
        typeof window.requestIdleCallback === 'function'
          ? window.requestIdleCallback(done, { timeout })
          : globalThis.setTimeout(done, 300);
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      if (handle === undefined) return;
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(handle);
      else globalThis.clearTimeout(handle);
    };
  }, [timeout]);

  return idle;
}
