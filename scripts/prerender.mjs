// Prerender estático tras `vite build`: inyecta en dist/index.html el HTML de la app (en español)
// y los metadatos del <head>, y genera robots.txt y sitemap.xml. Ver src/entry-server.tsx.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const SERVER_DIR = resolve('dist-server');
const INDEX = resolve('dist/index.html');
const HEAD_MARKER = '<!--app-head-->';
const ROOT_MARKER = '<div id="root"></div>';

const { render, head, robots, sitemap } = await import(
  pathToFileURL(resolve(SERVER_DIR, 'entry-server.js')).href
);

const template = await readFile(INDEX, 'utf8');
for (const marker of [HEAD_MARKER, ROOT_MARKER]) {
  if (!template.includes(marker))
    throw new Error(`prerender: no se encuentra ${marker} en ${INDEX}`);
}

const appHtml = await render();
const html = template
  .replace(HEAD_MARKER, head())
  .replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`);

await writeFile(INDEX, html);
await writeFile(resolve('dist/robots.txt'), robots());
await writeFile(resolve('dist/sitemap.xml'), sitemap());
await rm(SERVER_DIR, { recursive: true, force: true });

console.log(
  `prerender: index.html (${(html.length / 1024).toFixed(1)} kB), robots.txt, sitemap.xml`,
);
