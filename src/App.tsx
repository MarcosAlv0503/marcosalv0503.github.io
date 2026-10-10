import { MotionConfig } from 'motion/react';
import { useRef } from 'react';
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

export default function App() {
  const content = useRef<HTMLDivElement>(null);

  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <div ref={content} className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:pl-24">
          {/* Los títulos de sección y el timeline cuelgan del rail. */}
          <PipelineRail target={content} />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Links />
          <Contact />
        </div>
      </main>
      <Footer />
    </MotionConfig>
  );
}
