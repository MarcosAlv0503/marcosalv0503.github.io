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
    en: '/cv/cv-en.pdf',
  },
  links: [
    {
      id: 'linkedin',
      url: 'https://www.linkedin.com/in/marcos-%C3%A1lvarez-mart%C3%ADn-48393a2a1/',
      handle: 'marcos-álvarez-martín',
    },
    {
      id: 'github',
      url: 'https://github.com/MarcosAlv0503',
      handle: 'MarcosAlv0503',
    },
  ],
};
