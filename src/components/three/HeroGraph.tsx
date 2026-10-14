import { lazy, Suspense, useState } from 'react';
import { useCan3D } from '@/hooks/useCan3D';
import { useFirstInteraction } from '@/hooks/useFirstInteraction';
import { useIdle } from '@/hooks/useIdle';
import Scene3DFallback from './Scene3DFallback';

const Scene3D = lazy(() => import('./Scene3D'));

/**
 * Grafo del hero. Siempre pinta el SVG (ligero, sin JS extra); si el dispositivo lo permite,
 * carga la escena 3D cuando la página ha cargado y el usuario interactúa (la escena es interactiva:
 * hasta entonces el SVG es equivalente) y hace un fundido entre ambos.
 */
export default function HeroGraph() {
  const can3D = useCan3D();
  const idle = useIdle();
  const interacted = useFirstInteraction();
  const [ready, setReady] = useState(false);
  const show3D = can3D && idle && interacted;

  return (
    <div className="relative aspect-square w-full">
      <div
        className={`transition-opacity duration-700 ${show3D && ready ? 'opacity-0' : 'opacity-100'}`}
      >
        <Scene3DFallback />
      </div>
      {show3D && (
        <Suspense fallback={null}>
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
          >
            <Scene3D onReady={() => setReady(true)} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
