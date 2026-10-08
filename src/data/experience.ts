import type { ExperienceItem } from './types';

// Orden: más reciente primero.
export const experience: ExperienceItem[] = [
  {
    id: 'loang',
    role: 'AI Agent Developer',
    company: 'Loang Ediciones',
    start: '2026-03',
    end: '2026-09',
    tech: ['Python', 'Next.js', 'Make', { i18nKey: 'aiAgents' }],
  },
  {
    id: 'betterConsultants',
    role: 'Java Developer',
    company: 'Better Consultants',
    client: 'Bankinter',
    start: '2025-02',
    end: '2025-07',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'Oracle SQL'],
  },
  {
    id: 'adara',
    role: 'E-Learning & AI Developer',
    company: 'Adara Formación',
    start: '2023-08',
    end: '2024-07',
    tech: ['Moodle', 'Adobe Captivate', 'JavaScript', { i18nKey: 'aiContentCreation' }],
  },
  {
    id: 'worldSoftware',
    role: 'Full Stack Developer',
    company: 'World Software Services',
    start: '2023-03',
    end: '2023-08',
    tech: ['Python', 'Angular', 'Google Cloud', 'SMTP'],
  },
];
