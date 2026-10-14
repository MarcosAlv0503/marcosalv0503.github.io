import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/geist';
import '@fontsource-variable/jetbrains-mono';
import './styles/index.css';
import i18n from './i18n';

import { StrictMode, startTransition } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML llega prerenderizado en español (scripts/prerender.mjs). Si ese es el idioma
// activo, React lo hidrata sin repintar; si no (inglés, o desarrollo sin prerender), renderiza desde
// cero y retira `lang-pending`, que el script inline de index.html puso para ocultar el español.
// La hidratación va dentro de una transición para que React la trocee y ceda el hilo principal
// (la hidratación por defecto es una única tarea bloqueante).
if (container.firstElementChild && i18n.resolvedLanguage === 'es') {
  startTransition(() => {
    hydrateRoot(container, app);
  });
} else {
  container.textContent = '';
  const root = createRoot(container);
  flushSync(() => root.render(app));
  document.documentElement.classList.remove('lang-pending');
}
