// Ids de ancla de cada sección, en orden de aparición. El texto del menú vive en `nav.<id>`.
export const sectionIds = [
  'about',
  'experience',
  'education',
  'skills',
  'links',
  'contact',
] as const;

export type SectionId = (typeof sectionIds)[number];
