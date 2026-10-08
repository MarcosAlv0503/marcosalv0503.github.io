import type { SkillGroup } from './types';

// Agrupación propia a partir de la sección "Skills" del CV y las tecnologías de cada puesto.
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    skills: ['Java', 'Python', 'JavaScript'],
  },
  {
    id: 'development',
    skills: [
      { i18nKey: 'fullStack' },
      'Spring Boot',
      'Next.js',
      'Angular',
      'REST APIs',
      'Oracle SQL',
      'SMTP',
    ],
  },
  {
    id: 'ai',
    skills: [
      { i18nKey: 'genAiAgents' },
      { i18nKey: 'promptEngineering' },
      { i18nKey: 'workflowAutomation' },
      'Make',
      { i18nKey: 'aiContentCreation' },
    ],
  },
  {
    id: 'tools',
    skills: [
      'Git / Bitbucket',
      'Google Cloud',
      'Moodle',
      'Adobe Captivate',
      { i18nKey: 'projectManagement' },
    ],
  },
];
