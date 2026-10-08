import { profile } from '@/data/profile';

// Shell provisional de la Fase 1: valida tokens, tipografías y tema.
// Se sustituye por las secciones reales en la Fase 2.
export default function App() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-6 px-4 sm:px-8">
      <p className="font-mono text-sm text-accent">00 → init</p>
      <h1 className="font-display text-6xl leading-[0.95] font-bold tracking-tight sm:text-8xl">
        {profile.firstName}
        <br />
        {profile.lastName}
      </h1>
      <p className="font-mono text-fg-muted">{profile.role}</p>
      <div className="flex gap-3" aria-hidden="true">
        {['bg-bg', 'bg-surface', 'bg-surface-2', 'bg-fg', 'bg-accent', 'bg-secondary'].map((c) => (
          <span key={c} className={`size-8 rounded-full border border-border ${c}`} />
        ))}
      </div>
    </main>
  );
}
