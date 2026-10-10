import { type RefObject, useEffect, useState } from 'react';

/**
 * `true` cuando el borde superior del elemento ha cruzado la línea de lectura
 * (por defecto, el 55 % de la altura de la ventana). Vuelve a `false` al subir.
 */
export function usePassed(ref: RefObject<Element | null>, line = 0.55): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setPassed(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { rootMargin: `0px 0px -${Math.round((1 - line) * 100)}% 0px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, line]);

  return passed;
}
