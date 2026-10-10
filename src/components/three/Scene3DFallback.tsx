import { motion, useReducedMotion } from 'motion/react';

// Grafo estático (SVG) que representa un flujo de agentes: un nodo central conectado a servicios.
// Se usa mientras carga la escena 3D y cuando el 3D está desactivado (móvil, sin WebGL, reduced motion…).
// Forma parte de la entrada del hero: las aristas se dibujan desde el núcleo y los nodos aparecen después.

const nodes = [
  { x: 200, y: 200, r: 11, core: true },
  { x: 92, y: 112, r: 6 },
  { x: 298, y: 84, r: 7 },
  { x: 338, y: 224, r: 6 },
  { x: 276, y: 326, r: 7 },
  { x: 118, y: 300, r: 6 },
  { x: 48, y: 206, r: 5 },
  { x: 188, y: 50, r: 5 },
  { x: 376, y: 138, r: 4 },
  { x: 196, y: 370, r: 4 },
  { x: 34, y: 334, r: 4 },
  { x: 362, y: 362, r: 4 },
] as const;

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 7],
  [7, 2],
  [2, 8],
  [8, 3],
  [3, 11],
  [4, 11],
  [4, 9],
  [9, 5],
  [5, 10],
  [6, 10],
  [1, 6],
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Las aristas que salen del núcleo se dibujan primero; el resto, a continuación. */
const edgeDelay = (a: number) => (a === 0 ? 0.35 : 0.75);
const nodeDelay = (i: number) => (i === 0 ? 0.25 : 0.7 + i * 0.04);

export default function Scene3DFallback() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : 'hidden';

  return (
    <motion.svg
      viewBox="0 0 410 410"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
      initial={initial}
      animate="show"
    >
      <g stroke="var(--secondary)" strokeWidth="1.25" strokeOpacity="0.55">
        {edges.map(([a, b]) => (
          <motion.line
            key={`${a}-${b}`}
            x1={nodes[a]!.x}
            y1={nodes[a]!.y}
            x2={nodes[b]!.x}
            y2={nodes[b]!.y}
            variants={{
              hidden: { pathLength: 0 },
              show: {
                pathLength: 1,
                transition: { duration: 0.8, delay: edgeDelay(a), ease: EASE },
              },
            }}
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            show: {
              scale: 1,
              opacity: 1,
              transition: { duration: 0.5, delay: nodeDelay(i), ease: EASE },
            },
          }}
        >
          {'core' in n ? (
            <>
              <circle cx={n.x} cy={n.y} r={n.r * 2.4} fill="var(--accent)" opacity="0.12" />
              <circle cx={n.x} cy={n.y} r={n.r} fill="var(--accent)" />
            </>
          ) : (
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="var(--bg)"
              stroke="var(--fg)"
              strokeWidth="1.5"
            />
          )}
        </motion.g>
      ))}
    </motion.svg>
  );
}
