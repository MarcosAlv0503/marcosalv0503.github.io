import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { Locale } from '@/data/types';
import enJson from '@/locales/en.json';
import es from '@/locales/es.json';

// Comprobación en compilación: en.json debe tener las mismas claves que es.json.
const en: typeof es = enJson;

export const locales: readonly Locale[] = ['es', 'en'];
export const LANG_STORAGE_KEY = 'lang';

function syncDocument(lng: string) {
  if (typeof document === 'undefined') return; // prerender en Node
  document.documentElement.lang = i18n.resolvedLanguage ?? lng;
  document.title = i18n.t('meta.title');
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'));
}

/**
 * El idioma inicial lo decide el script inline de index.html antes del primer pintado (elección
 * guardada en localStorage → idioma del navegador → español) y lo deja en <html lang>. Aquí solo
 * se lee, para que la detección viva en un único sitio. En el prerender (Node) se usa español.
 */
function initialLanguage(): Locale {
  if (typeof document === 'undefined') return 'es';
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}

i18n.on('languageChanged', syncDocument);

void i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: initialLanguage(),
  supportedLngs: locales,
  fallbackLng: 'es',
  initAsync: false, // recursos en línea: idioma resuelto antes de renderizar/hidratar
  interpolation: { escapeValue: false },
  returnObjects: true,
});

/** Cambia de idioma y recuerda la elección (la lee el script inline de index.html). */
export function setLanguage(lng: Locale) {
  void i18n.changeLanguage(lng);
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lng);
  } catch {
    // Almacenamiento no disponible: el idioma se mantiene solo en esta visita.
  }
}

export default i18n;
