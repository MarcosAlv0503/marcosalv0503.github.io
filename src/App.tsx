import { LazyMotion, MotionConfig } from 'motion/react';
import { Suspense, useRef } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PipelineRail from '@/components/layout/PipelineRail';
import SkipLink from '@/components/layout/SkipLink';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Hero from '@/components/sections/Hero';
import Links from '@/components/sections/Links';
import Skills from '@/components/sections/Skills';

// Secciones bajo el hero, en orden.
const sections = [
  ['about', About],
  ['experience', Experience],
  ['education', Education],
  ['skills', Skills],
  ['links', Links],
  ['contact', Contact],
] as const;

const loadMotionFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default);

export default function App() {
  const content = useRef<HTMLDivElement>(null);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <div ref={content} className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:pl-24">
            {/* Los títulos de sección y el timeline cuelgan del rail. */}
            <PipelineRail target={content} />
            {/* Cada sección es un límite de Suspense: React hidrata el HTML prerenderizado por partes,
                cediendo el hilo principal entre ellas en lugar de hacerlo en una sola tarea larga. */}
            {sections.map(([id, Section]) => (
              <Suspense key={id} fallback={null}>
                <Section />
              </Suspense>
            ))}
          </div>
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
