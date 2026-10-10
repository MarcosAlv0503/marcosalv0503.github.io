import { Vector3 } from 'three';

export type Graph = {
  /** El nodo 0 es el núcleo (el "agente"), en el origen. */
  nodes: Vector3[];
  sizes: number[];
  edges: [number, number][];
  adjacency: number[][];
};

/** PRNG determinista: el grafo es siempre el mismo entre visitas. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildGraph(count = 30, seed = 7): Graph {
  const rand = mulberry32(seed);
  const nodes = [new Vector3(0, 0, 0)];
  const sizes = [0];

  // Nodos repartidos en una corteza elipsoidal alrededor del núcleo, con separación mínima.
  let attempts = 0;
  while (nodes.length < count && attempts++ < 5000) {
    const u = rand() * 2 - 1;
    const theta = rand() * Math.PI * 2;
    const r = 1.2 + rand() * 1.5;
    const s = Math.sqrt(1 - u * u);
    const p = new Vector3(s * Math.cos(theta) * r * 1.2, s * Math.sin(theta) * r, u * r * 0.7);
    if (nodes.some((n) => n.distanceTo(p) < 0.6)) continue;
    nodes.push(p);
    sizes.push(0.045 + rand() * 0.05);
  }

  const keys = new Set<string>();
  const edges: [number, number][] = [];
  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || keys.has(key)) return;
    keys.add(key);
    edges.push([a, b]);
  };
  const byDistanceFrom = (i: number, candidates: number[]) =>
    [...candidates].sort(
      (a, b) => nodes[i]!.distanceTo(nodes[a]!) - nodes[i]!.distanceTo(nodes[b]!),
    );

  const outer = nodes.map((_, i) => i).slice(1);
  // Cada nodo se une a sus dos vecinos más cercanos…
  for (const i of outer) {
    for (const j of byDistanceFrom(
      i,
      outer.filter((j) => j !== i),
    ).slice(0, 2))
      addEdge(i, j);
  }
  // …y los seis más cercanos al núcleo se conectan con él.
  for (const j of byDistanceFrom(0, outer).slice(0, 6)) addEdge(0, j);

  // Garantiza un grafo conexo para que los pulsos puedan recorrerlo entero.
  const reached = new Set<number>();
  const visit = () => {
    const queue = [0];
    reached.clear();
    reached.add(0);
    while (queue.length) {
      const cur = queue.shift()!;
      for (const [a, b] of edges) {
        const next = a === cur ? b : b === cur ? a : -1;
        if (next >= 0 && !reached.has(next)) {
          reached.add(next);
          queue.push(next);
        }
      }
    }
  };
  visit();
  for (const i of outer) {
    if (reached.has(i)) continue;
    addEdge(i, byDistanceFrom(i, [...reached])[0]!);
    visit();
  }

  const adjacency = nodes.map(() => [] as number[]);
  for (const [a, b] of edges) {
    adjacency[a]!.push(b);
    adjacency[b]!.push(a);
  }

  return { nodes, sizes, edges, adjacency };
}
