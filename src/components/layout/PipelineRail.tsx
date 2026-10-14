import { m, useScroll, useSpring } from 'motion/react';
import type { RefObject } from 'react';

type PipelineRailProps = { target: RefObject<HTMLElement | null> };

/**
 * Rail vertical del pipeline (solo escritorio). Una línea en accent avanza con el scroll,
 * sincronizada con la línea de lectura (55 % de la ventana) que enciende los nodos.
 */
export default function PipelineRail({ target }: PipelineRailProps) {
  const { scrollYProgress } = useScroll({ target, offset: ['start 55%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <div aria-hidden="true" className="absolute inset-y-0 left-12 hidden w-px lg:block">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-border to-border" />
      <m.div
        className="absolute inset-y-0 -left-[0.5px] w-[2px] origin-top bg-accent"
        style={{ scaleY: progress }}
      />
    </div>
  );
}
