import { useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { BufferGeometry, Color, Float32BufferAttribute, Object3D, Vector3 } from 'three';
import type { Group, InstancedMesh, Mesh } from 'three';
import { buildGraph } from './graph';
import { useThemeColors } from './useThemeColors';

const PULSES = 12;
/** Radio (px) alrededor del cursor en el que los nodos se iluminan. */
const HOVER_RADIUS = 120;

const dummy = new Object3D();
const projected = new Vector3();
const mixed = new Color();

type Pulse = { from: number; to: number; t: number; speed: number };

type NodeGraphProps = { onFirstFrame?: () => void };

export default function NodeGraph({ onFirstFrame }: NodeGraphProps) {
  const graph = useMemo(() => buildGraph(), []);
  const colors = useThemeColors();

  const group = useRef<Group>(null);
  const nodesMesh = useRef<InstancedMesh>(null);
  const pulsesMesh = useRef<InstancedMesh>(null);
  const halo = useRef<Mesh>(null);

  /** Brillo de cada nodo (0–1): sube al recibir un pulso o con el cursor cerca, y decae. */
  const glow = useMemo(() => new Float32Array(graph.nodes.length), [graph]);
  const pulses = useMemo<Pulse[]>(() => {
    return Array.from({ length: PULSES }, (_, i) => {
      const [a, b] = graph.edges[(i * 7) % graph.edges.length]!;
      return { from: a, to: b, t: (i * 0.37) % 1, speed: 0.55 + ((i * 0.29) % 0.5) };
    });
  }, [graph]);

  const rendered = useRef(false);
  const pointer = useRef({ nx: 0, ny: 0, x: -1e4, y: -1e4 });
  const smooth = useRef({ nx: 0, ny: 0, scroll: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const p = pointer.current;
      p.nx = (e.clientX / window.innerWidth) * 2 - 1;
      p.ny = -((e.clientY / window.innerHeight) * 2 - 1);
      p.x = e.clientX;
      p.y = e.clientY;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const edgeGeometry = useMemo(() => {
    const positions = graph.edges.flatMap(([a, b]) => [
      ...graph.nodes[a]!.toArray(),
      ...graph.nodes[b]!.toArray(),
    ]);
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [graph]);

  useEffect(() => () => edgeGeometry.dispose(), [edgeGeometry]);

  // Los colores por instancia deben existir antes del primer render para que el shader los use.
  useLayoutEffect(() => {
    const mesh = nodesMesh.current;
    if (!mesh) return;
    graph.nodes.forEach((_, i) => mesh.setColorAt(i, colors.fg));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [graph, colors]);

  useFrame((state, delta) => {
    const { camera, gl } = state;
    const g = group.current;
    const nodes = nodesMesh.current;
    const pulseMesh = pulsesMesh.current;
    if (!g || !nodes || !pulseMesh) return;

    const dt = Math.min(delta, 0.05);
    const p = pointer.current;
    const s = smooth.current;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    s.nx += (p.nx - s.nx) * 0.05;
    s.ny += (p.ny - s.ny) * 0.05;
    s.scroll += (scroll - s.scroll) * 0.1;

    // Parallax con el ratón + deriva lenta; al hacer scroll el grafo gira y se despliega.
    g.rotation.y = state.clock.elapsedTime * 0.05 + s.nx * 0.45 + s.scroll * 1.4;
    g.rotation.x = -s.ny * 0.25 + s.scroll * 0.35;
    g.scale.setScalar(1 + s.scroll * 0.4);
    camera.position.z = 7.4 + s.scroll * 2.5;
    g.updateMatrixWorld();

    // Pulsos: viajan por las aristas y, al llegar a un nodo, lo encienden y eligen otra salida.
    pulses.forEach((pulse, i) => {
      const a = graph.nodes[pulse.from]!;
      const b = graph.nodes[pulse.to]!;
      pulse.t += (dt * pulse.speed) / Math.max(a.distanceTo(b), 0.3);
      if (pulse.t >= 1) {
        glow[pulse.to] = 1;
        const exits = graph.adjacency[pulse.to]!;
        const options = exits.length > 1 ? exits.filter((n) => n !== pulse.from) : exits;
        pulse.from = pulse.to;
        pulse.to = options[Math.floor(Math.random() * options.length)]!;
        pulse.t = 0;
      }
      dummy.position.lerpVectors(graph.nodes[pulse.from]!, graph.nodes[pulse.to]!, pulse.t);
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      pulseMesh.setMatrixAt(i, dummy.matrix);
    });
    pulseMesh.instanceMatrix.needsUpdate = true;

    // Nodos: brillo por pulso o proximidad del cursor (proyectando cada nodo a la pantalla).
    const rect = gl.domElement.getBoundingClientRect();
    graph.nodes.forEach((node, i) => {
      projected.copy(node).applyMatrix4(g.matrixWorld).project(camera);
      const sx = rect.left + ((projected.x + 1) / 2) * rect.width;
      const sy = rect.top + ((1 - projected.y) / 2) * rect.height;
      const near = Math.max(0, 1 - Math.hypot(sx - p.x, sy - p.y) / HOVER_RADIUS);
      glow[i] = Math.max(glow[i]! - dt * 1.6, near);

      const k = glow[i]!;
      dummy.position.copy(node);
      dummy.scale.setScalar(i === 0 ? 0 : graph.sizes[i]! * (1 + k * 0.7));
      dummy.updateMatrix();
      nodes.setMatrixAt(i, dummy.matrix);
      nodes.setColorAt(i, mixed.copy(colors.fg).lerp(colors.accent, k));
    });
    nodes.instanceMatrix.needsUpdate = true;
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;

    halo.current?.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.1);

    // Avisa tras el primer fotograma completo (shaders compilados) para hacer el fundido sin huecos.
    if (!rendered.current) {
      rendered.current = true;
      requestAnimationFrame(() => onFirstFrame?.());
    }
  });

  return (
    <>
      <fog attach="fog" args={[colors.bg, 7, 13]} />
      <group ref={group}>
        <lineSegments geometry={edgeGeometry}>
          <lineBasicMaterial color={colors.secondary} transparent opacity={0.5} />
        </lineSegments>
        <instancedMesh ref={nodesMesh} args={[undefined, undefined, graph.nodes.length]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
        <instancedMesh ref={pulsesMesh} args={[undefined, undefined, PULSES]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={colors.accent} toneMapped={false} />
        </instancedMesh>
        <mesh>
          <sphereGeometry args={[0.17, 24, 16]} />
          <meshBasicMaterial color={colors.accent} toneMapped={false} />
        </mesh>
        <mesh ref={halo}>
          <sphereGeometry args={[0.42, 24, 16]} />
          <meshBasicMaterial
            color={colors.accent}
            transparent
            opacity={0.12}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </>
  );
}
