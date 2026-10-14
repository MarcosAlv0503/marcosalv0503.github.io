import { useTranslation } from 'react-i18next';
import HeroGraph from '@/components/three/HeroGraph';
import { ButtonLink } from '@/components/ui/Button';
import DownloadCvButton from '@/components/ui/DownloadCvButton';
import { MapPinIcon } from '@/components/ui/icons';
import { profile } from '@/data/profile';
import { heroDelay as delay } from '@/lib/heroDelay';

// Único momento orquestado de la web: el nombre sube línea a línea y el resto aparece detrás.
// Es CSS puro para que se vea igual en el HTML prerenderizado, antes de que cargue React.
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
          <p className="animate-hero-fade-up text-lg text-fg-muted sm:text-xl" style={delay(0.05)}>
            {t('hero.greeting')}
          </p>
          <h1
            id="hero-title"
            className="mt-2 font-display text-[clamp(3.75rem,15vw,9.5rem)] leading-[0.98] font-extrabold tracking-[-0.045em]"
          >
            {[profile.firstName, profile.lastName].map((word, i) => (
              // El padding superior deja sitio a la tilde de "Á" dentro de la máscara.
              <span key={word} className="-mt-[0.16em] block overflow-hidden pt-[0.16em]">
                <span className="block animate-hero-rise" style={delay(0.14 + i * 0.09)}>
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="mt-8 animate-hero-fade-up font-mono text-base sm:text-lg"
            style={delay(0.32)}
          >
            {profile.role}
            <span aria-hidden="true" className="animate-blink text-accent">
              _
            </span>
          </p>
          <p
            className="mt-3 flex animate-hero-fade-up items-center gap-2 text-fg-muted"
            style={delay(0.41)}
          >
            <MapPinIcon className="size-4" />
            {profile.location}
          </p>
          <div className="mt-10 flex animate-hero-fade-up flex-wrap gap-3" style={delay(0.5)}>
            <ButtonLink href="#experience">{t('hero.seeExperience')}</ButtonLink>
            <DownloadCvButton variant="ghost" />
          </div>
        </div>

        <div className="pointer-events-none absolute top-20 -right-28 w-[26rem] opacity-25 sm:-right-16 sm:w-[30rem] lg:static lg:col-span-5 lg:w-full lg:opacity-100">
          <HeroGraph />
        </div>
      </div>
    </section>
  );
}
