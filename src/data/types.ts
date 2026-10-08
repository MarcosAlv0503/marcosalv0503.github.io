export type Locale = 'es' | 'en';

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

export type SocialLink = {
  id: 'linkedin' | 'github';
  url: string;
  /** Texto corto visible (usuario o handle). */
  handle: string;
};
