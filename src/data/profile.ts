import type { Profile } from './types';

export const profile: Profile = {
  firstName: 'Marcos',
  lastName: 'Álvarez',
  role: 'Full-Stack & AI Agent Developer',
  email: 'marcos.alv0503@gmail.com',
  phone: '+34 644 87 77 28',
  // Solo municipio: la calle no se publica.
  location: 'Rivas-Vaciamadrid',
  cv: {
    es: '/cv/cv-es.pdf',
    // TODO: añadir public/cv/cv-en.pdf cuando Marcos lo envíe.
    en: '/cv/cv-en.pdf',
  },
};
