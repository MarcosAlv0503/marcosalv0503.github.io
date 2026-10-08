import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from '@/locales/es.json';

// Fase 2: solo español. En la Fase 3 se añaden inglés, detección y persistencia.
void i18n.use(initReactI18next).init({
  resources: { es: { translation: es } },
  lng: 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
