export type Locale = 'es' | 'en';

/** Fecha ISO parcial: 'YYYY' o 'YYYY-MM'. */
export type IsoDate = `${number}` | `${number}-${number}`;

/**
 * Tecnología o habilidad. Los nombres propios (Java, Next.js…) son literales;
 * los conceptos traducibles se referencian con una clave de `tech.*` en los locales.
 */
export type Tech = string | { i18nKey: string };

export type SocialLink = {
  id: 'linkedin' | 'github';
  url: string;
  /** Texto corto visible (usuario o handle). */
  handle: string;
};

export type Profile = {
  firstName: string;
  lastName: string;
  /** Rol tal y como aparece en el hero (igual en ambos idiomas). */
  role: string;
  email: string;
  phone: string;
  location: string;
  /** Rutas a los PDF del CV en public/, una por idioma. */
  cv: Record<Locale, string>;
  links: SocialLink[];
};

/** Textos en locales: `experience.items.<id>.description`. */
export type ExperienceItem = {
  id: string;
  /** Título del puesto tal y como figura en el CV (igual en ambos idiomas). */
  role: string;
  company: string;
  client?: string;
  start: IsoDate;
  /** `null` = actualidad. */
  end: IsoDate | null;
  tech: Tech[];
};

/** Textos en locales: `education.items.<id>.{title, name?}`. */
export type EducationItem = {
  id: string;
  /** Siglas del título, si las tiene (DAW, DAM). */
  acronym?: string;
  center: string;
  start: IsoDate;
  end: IsoDate | null;
};

/** Título del grupo en locales: `skills.groups.<id>`. */
export type SkillGroup = {
  id: string;
  skills: Tech[];
};

/** Textos en locales: `projects.items.<id>.{title, summary, details}`. */
export type Project = {
  id: string;
  kind: 'personal' | 'professional';
  tech: Tech[];
  repoUrl?: string;
  demoUrl?: string;
  /** Ruta en public/ a captura o GIF. */
  media?: string;
  featured?: boolean;
};
