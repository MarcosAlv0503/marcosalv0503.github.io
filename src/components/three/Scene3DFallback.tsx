// Grafo estático (SVG) que representa un flujo de agentes: un nodo central conectado a servicios.
// Se usa mientras carga la escena 3D y cuando el 3D está desactivado (sin WebGL, reduced motion…).

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

export default function Scene3DFallback() {
  return (
    <svg viewBox="0 0 410 410" className="h-auto w-full" aria-hidden="true" focusable="false">
      <g stroke="var(--secondary)" strokeWidth="1.25" strokeOpacity="0.55">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a]!.x}
            y1={nodes[a]!.y}
            x2={nodes[b]!.x}
            y2={nodes[b]!.y}
          />
        ))}
      </g>
      {nodes.map((n, i) =>
        'core' in n ? (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r * 2.4} fill="var(--accent)" opacity="0.12" />
            <circle cx={n.x} cy={n.y} r={n.r} fill="var(--accent)" />
          </g>
        ) : (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="var(--bg)"
            stroke="var(--fg)"
            strokeWidth="1.5"
          />
        ),
      )}
    </svg>
  );
}
