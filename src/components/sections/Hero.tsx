import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';
import HeroGraph from '@/components/three/HeroGraph';
import { ButtonLink } from '@/components/ui/Button';
import DownloadCvButton from '@/components/ui/DownloadCvButton';
import { MapPinIcon } from '@/components/ui/icons';
import { profile } from '@/data/profile';

const EASE = [0.22, 1, 0.36, 1] as const;

// Único momento orquestado de la web: el nombre sube línea a línea y el resto aparece detrás.
const sequence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const nameLine: Variants = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.95, ease: EASE } },
};

export default function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-16"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-canvas-grid" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:pl-24">
        <motion.div
          className="lg:col-span-7"
          variants={sequence}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          <motion.p variants={fadeUp} className="text-lg text-fg-muted sm:text-xl">
            {t('hero.greeting')}
          </motion.p>
          <h1
            id="hero-title"
            className="mt-2 font-display text-[clamp(3.75rem,15vw,9.5rem)] leading-[0.98] font-extrabold tracking-[-0.045em]"
          >
            {[profile.firstName, profile.lastName].map((word) => (
              // El padding superior deja sitio a la tilde de "Á" dentro de la máscara.
              <span key={word} className="-mt-[0.16em] block overflow-hidden pt-[0.16em]">
                <motion.span variants={nameLine} className="block">
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p variants={fadeUp} className="mt-8 font-mono text-base sm:text-lg">
            {profile.role}
            <span aria-hidden="true" className="animate-blink text-accent">
              _
            </span>
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 flex items-center gap-2 text-fg-muted">
            <MapPinIcon className="size-4" />
            {profile.location}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#experience">{t('hero.seeExperience')}</ButtonLink>
            <DownloadCvButton variant="ghost" />
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute top-20 -right-28 w-[26rem] opacity-25 sm:-right-16 sm:w-[30rem] lg:static lg:col-span-5 lg:w-full lg:opacity-100">
          <HeroGraph />
        </div>
      </div>
    </section>
  );
}
