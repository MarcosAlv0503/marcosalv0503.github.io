import { useSyncExternalStore } from 'react';

// 3D solo en escritorio con ratón y sin preferencia de movimiento reducido. En móvil el grafo es un
// fondo tenue y no compensa descargar ni ejecutar three.js.
const QUERY = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

let capable: boolean | undefined;

/** WebGL disponible y dispositivo no modesto. Se calcula una sola vez. */
function isCapable(): boolean {
  if (capable !== undefined) return capable;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  let webgl = false;
  if (!lowEnd) {
    try {
      const canvas = document.createElement('canvas');
      webgl = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      webgl = false;
    }
  }
  capable = webgl && !lowEnd;
  return capable;
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getSnapshot() {
  return isCapable() && window.matchMedia(QUERY).matches;
}

export function useCan3D(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
