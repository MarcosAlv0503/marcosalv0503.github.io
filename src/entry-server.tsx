// Entrada de servidor: solo se usa en el build (scripts/prerender.mjs) para generar el HTML estático
// en español, los metadatos del <head>, robots.txt y sitemap.xml a partir de los datos del proyecto.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { education } from './data/education';
import { profile } from './data/profile';
import { site } from './data/site';
import { skillGroups } from './data/skills';
import i18n from './i18n';
import { techLabel } from './lib/tech';
import es from './locales/es.json';

const PRERENDER_LOCALE = 'es';

export async function render(): Promise<string> {
  await i18n.changeLanguage(PRERENDER_LOCALE);
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

const escapeAttr = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const meta = (attr: 'name' | 'property', key: string, content: string | number) =>
  `<meta ${attr}="${key}" content="${escapeAttr(String(content))}" />`;

/** Etiquetas SEO, Open Graph, Twitter y JSON-LD para el <head>. */
export function head(): string {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const image = new URL(site.ogImage, site.url).href;

  const tEs = i18n.getFixedT(PRERENDER_LOCALE);
  const knowsAbout = [
    ...new Set(skillGroups.flatMap((group) => group.skills.map((skill) => techLabel(skill, tEs)))),
  ];

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.role,
    url: site.url,
    image,
    email: `mailto:${profile.email}`,
    telephone: profile.phone.replace(/\s/g, ''),
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
      addressCountry: site.country,
    },
    sameAs: profile.links.map((link) => link.url),
    alumniOf: education.map((item) => ({ '@type': 'EducationalOrganization', name: item.center })),
    knowsAbout,
  };
  // "<" escapado para que el JSON no pueda cerrar la etiqueta <script>.
  const jsonLd = JSON.stringify(person).replaceAll('<', '\\u003c');

  return [
    meta('name', 'description', es.meta.description),
    meta('name', 'author', fullName),
    `<link rel="canonical" href="${site.url}" />`,
    meta('property', 'og:type', 'profile'),
    meta('property', 'og:site_name', fullName),
    meta('property', 'og:title', es.meta.title),
    meta('property', 'og:description', es.meta.description),
    meta('property', 'og:url', site.url),
    meta('property', 'og:image', image),
    meta('property', 'og:image:type', 'image/png'),
    meta('property', 'og:image:width', site.ogImageSize.width),
    meta('property', 'og:image:height', site.ogImageSize.height),
    meta('property', 'og:image:alt', es.meta.ogImageAlt),
    meta('property', 'og:locale', site.ogLocale),
    meta('property', 'og:locale:alternate', site.ogLocaleAlternate),
    meta('property', 'profile:first_name', profile.firstName),
    meta('property', 'profile:last_name', profile.lastName),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', es.meta.title),
    meta('name', 'twitter:description', es.meta.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', es.meta.ogImageAlt),
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}

export function robots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', site.url).href}\n`;
}

export function sitemap(): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <url><loc>${site.url}</loc><lastmod>${lastmod}</lastmod></url>`,
    '</urlset>',
    '',
  ].join('\n');
}
