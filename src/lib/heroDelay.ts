import type { CSSProperties } from 'react';

/** Retardo (en segundos) de las animaciones CSS `animate-hero-*`, vía la variable `--delay`. */
export const heroDelay = (seconds: number) => ({ '--delay': `${seconds}s` }) as CSSProperties;
