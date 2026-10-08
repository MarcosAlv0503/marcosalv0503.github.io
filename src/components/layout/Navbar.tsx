import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DownloadCvButton from '@/components/ui/DownloadCvButton';
import { CloseIcon, MenuIcon } from '@/components/ui/icons';
import { profile } from '@/data/profile';
import { sectionIds } from '@/data/sections';
import { useActiveSection } from '@/hooks/useActiveSection';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { t } = useTranslation();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const links = sectionIds.map((id) => (
    <li key={id}>
      <a
        href={`#${id}`}
        onClick={() => setOpen(false)}
        aria-current={active === id ? 'true' : undefined}
        className="block rounded-full px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg aria-[current=true]:text-fg max-lg:py-3 max-lg:text-base"
      >
        {t(`nav.${id}`)}
      </a>
    </li>
  ));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <nav
        aria-label={t('nav.label')}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8"
      >
        <a
          href="#top"
          aria-label={t('nav.home')}
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
          {profile.firstName[0]}
          {profile.lastName[0]}
        </a>

        <ul className="hidden items-center lg:flex">{links}</ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <DownloadCvButton compact />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="inline-flex size-9 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface lg:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border/60 bg-bg px-4 pt-2 pb-6 sm:px-8 lg:hidden"
      >
        <ul>{links}</ul>
      </div>
    </header>
  );
}
