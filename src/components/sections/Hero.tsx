import { useTranslation } from 'react-i18next';
import Scene3DFallback from '@/components/three/Scene3DFallback';
import { ButtonLink } from '@/components/ui/Button';
import DownloadCvButton from '@/components/ui/DownloadCvButton';
import { MapPinIcon } from '@/components/ui/icons';
import { profile } from '@/data/profile';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-16"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-canvas-grid" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:pl-24">
        <div className="lg:col-span-7">
          <p className="text-lg text-fg-muted sm:text-xl">{t('hero.greeting')}</p>
          <h1
            id="hero-title"
            className="mt-2 font-display text-[clamp(3.75rem,15vw,9.5rem)] leading-[0.98] font-extrabold tracking-[-0.045em]"
          >
            <span className="block">{profile.firstName}</span>
            <span className="block">{profile.lastName}</span>
          </h1>
          <p className="mt-8 font-mono text-base sm:text-lg">
            {profile.role}
            <span aria-hidden="true" className="animate-blink text-accent">
              _
            </span>
          </p>
          <p className="mt-3 flex items-center gap-2 text-fg-muted">
            <MapPinIcon className="size-4" />
            {profile.location}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#experience">{t('hero.seeExperience')}</ButtonLink>
            <DownloadCvButton variant="ghost" />
          </div>
        </div>

        <div className="pointer-events-none absolute top-20 -right-28 w-[26rem] opacity-25 sm:-right-16 sm:w-[30rem] lg:static lg:col-span-5 lg:w-full lg:opacity-100">
          <Scene3DFallback />
        </div>
      </div>
    </section>
  );
}
