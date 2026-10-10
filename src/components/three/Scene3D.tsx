import { PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import NodeGraph from './NodeGraph';

type Scene3DProps = { onReady: () => void };

/** Se carga en diferido (React.lazy) desde HeroGraph: three.js va en su propio chunk. */
export default function Scene3D({ onReady }: Scene3DProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio, 1.5));

  // Sin render mientras el hero no está en pantalla.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry?.isIntersecting ?? true),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={dpr}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 7.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        aria-hidden="true"
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <NodeGraph onFirstFrame={onReady} />
      </Canvas>
    </div>
  );
}
