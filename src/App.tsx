import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import SkipLink from '@/components/layout/SkipLink';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Hero from '@/components/sections/Hero';
import Links from '@/components/sections/Links';
import Skills from '@/components/sections/Skills';

export default function App() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:pl-24">
          {/* Rail del pipeline: los títulos de sección y el timeline cuelgan de él. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-12 hidden w-px bg-linear-to-b from-transparent via-border to-border lg:block"
          />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Links />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
