import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import type { Locale } from '@/data/types';
import enJson from '@/locales/en.json';
import es from '@/locales/es.json';

// Comprobación en compilación: en.json debe tener las mismas claves que es.json.
const en: typeof es = enJson;

export const locales: readonly Locale[] = ['es', 'en'];
export const LANG_STORAGE_KEY = 'lang';

function syncDocument(lng: string) {
  document.documentElement.lang = i18n.resolvedLanguage ?? lng;
  document.title = i18n.t('meta.title');
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'));
}

i18n.on('languageChanged', syncDocument);

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { es: { translation: es }, en: { translation: en } },
    supportedLngs: locales,
    nonExplicitSupportedLngs: true, // 'en-US' → 'en'
    load: 'languageOnly',
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
    returnObjects: true,
    detection: {
      // Primero la elección guardada; si no hay, el idioma del navegador.
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANG_STORAGE_KEY,
      // Solo se guarda cuando el usuario elige idioma (LanguageToggle), no lo detectado.
      caches: [],
    },
  });

/** Cambia de idioma y recuerda la elección. */
export function setLanguage(lng: Locale) {
  void i18n.changeLanguage(lng);
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lng);
  } catch {
    // Almacenamiento no disponible: el idioma se mantiene solo en esta visita.
  }
}

export default i18n;
