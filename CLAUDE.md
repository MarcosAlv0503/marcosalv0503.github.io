# CLAUDE.md — Portfolio de Marcos Álvarez

Web estática de portfolio/CV desplegada en GitHub Pages (`marcosalv0503.github.io`).
Idioma de trabajo con el usuario: **español**.

## Stack

React 19 + Vite + TypeScript (strict) · Tailwind CSS v4 (config CSS-first en `src/styles/index.css`) ·
Motion (antes Framer Motion: paquete `motion`, importar desde `motion/react`) · React Three Fiber + drei · react-i18next · ESLint (flat config) + Prettier.
Sin backend, sin router: single page con anclas y scroll suave.

## Comandos

```bash
npm run dev           # servidor de desarrollo
npm run build         # tsc -b + vite build + build SSR + prerender → dist/
npm run preview       # sirve dist/
npm run lint          # ESLint
npm run format        # Prettier (escribe) · format:check (CI)
```

Antes de cada commit: `npm run lint && npm run format:check && npm run build` deben pasar (el CI los ejecuta).

## Reglas de contenido

- **Fuente única: el CV** (`public/cv/cv-es.pdf`) y lo que el usuario indique explícitamente. No inventar
  proyectos, fechas, empresas, tecnologías ni enlaces. Lo que falte → placeholder con `TODO:` y preguntar.
- **Privacidad:** se muestran email, teléfono y municipio. **Nunca** la calle/dirección postal.
- Rol en el hero: `Full-Stack & AI Agent Developer` (igual en ES y EN).
- Proyectos: se añadirán más adelante (con GIFs/capturas). Mientras `src/data/projects.ts` esté vacío, la
  sección y su entrada de menú no se renderizan, y el CTA principal del hero apunta a Experiencia.

## Arquitectura

```
src/
  components/
    layout/    Navbar, Footer, LanguageToggle, ThemeToggle, SkipLink
    sections/  Hero, About, Projects, Experience, Education, Skills, Links, Contact
    projects/  ProjectCard, ProjectFilter, ProjectModal
    timeline/  Timeline, TimelineItem
    three/     HeroGraph, Scene3D (lazy), NodeGraph, Scene3DFallback
    ui/        Botones, Tag, SectionHeading, CopyButton, DownloadCvButton…
  data/        Datos tipados e independientes del idioma (ids, fechas ISO, tecnologías, URLs)
  hooks/       useCan3D, useIdle, usePassed, useTheme, useActiveSection…
  i18n/        Configuración de react-i18next
  locales/     es.json, en.json — TODO el texto visible
  lib/         Utilidades puras (formatDate, techLabel, motionFeatures…)
  styles/      index.css (tokens + Tailwind + animaciones del hero)
  entry-server.tsx   Solo build: render a HTML, <head> SEO/OG/JSON-LD, robots.txt, sitemap.xml
scripts/prerender.mjs  Inyecta todo lo anterior en dist/ tras `vite build`
```

- **Cero texto hardcodeado en componentes.** Texto traducible → `src/locales/{es,en}.json`, enlazado por `id`
  (p. ej. `experience.loang.description`). Datos neutros (fechas, tecnologías, URLs) → `src/data/*.ts`.
  Excepciones: nombres propios y tecnologías.
- Fechas en ISO (`'2026-03'`), formateadas con `formatDate` y los nombres de mes de los locales (`months`),
  no con Intl: así el HTML prerenderizado en Node y el del navegador coinciden. `end: null` = actualidad.
- Un componente por archivo, `export default` para componentes de sección; nombres en PascalCase.
- Imports con alias `@/` → `src/`.
- Mantener `es.json` y `en.json` con las mismas claves.

## i18n

- ES/EN. El idioma inicial lo decide **solo** el script inline de `index.html` antes del primer pintado
  (elección guardada en `localStorage` `lang` → idioma del navegador → `es`) y lo deja en `<html lang>`;
  `src/i18n` lo lee de ahí (no hay detector de i18next).
- Al cambiar de idioma se actualizan `<html lang>`, el título y la meta description.
- El botón "Descargar CV" usa `profile.cv[idioma]`.
- Traducciones dudosas aceptadas: ver sección "Glosario" más abajo; si surge una nueva, preguntar.

## Diseño — concepto "Pipeline"

La web se lee como un flujo automatizado (agentes de IA / automatización). Lo memorable es el hero (nombre
enorme + grafo de nodos, en 3D a partir de la Fase 4, con pulsos por las aristas que reaccionan a ratón y
scroll); el resto es sobrio y disciplinado.

- **Rail del pipeline** (escritorio, `lg+`): una línea vertical (`App.tsx`, `left-12`) recorre las secciones.
  Cada título de sección es un nodo con borde accent (`SectionHeading`, `-left-[54px]`) y cada entrada del
  timeline un nodo pequeño (`TimelineItem`, `-left-[52px]`). En móvil el timeline usa su propia línea.
  Si cambia el padding del contenedor (`lg:pl-24`), recalcular esos offsets.
- **Sin numeración** en los títulos de sección (no son una secuencia) ni eyebrows en mayúsculas.
- Fondo del hero: rejilla de puntos (`bg-canvas-grid`), guiño a los lienzos de Make/n8n.
- Evitar tarjetas idénticas: los grupos se separan con filetes (`border-t`), no con cards.
- Nada de `→` añadido al texto de botones/enlaces; los iconos van como SVG en `components/ui/icons.tsx`.
- Animación: un único momento orquestado (entrada del hero: nombre por líneas + grafo que se dibuja) +
  respuestas a acciones (menú móvil, selector de idioma, tema) y el pipeline activándose con el scroll
  (`PipelineRail` + `usePassed`, línea de lectura al 55 % de la ventana). Nada de fade-up genérico por sección.
- La entrada del hero es **CSS** (`animate-hero-*` con `--delay`), no Motion, para que funcione en el HTML
  prerenderizado antes de que cargue React. El dibujado del grafo SVG solo en `lg+`; en móvil, fundido.

- **Tema:** oscuro por defecto, claro opcional (toggle). Se controla con `data-theme` en `<html>`; guardado
  en `localStorage` (`theme`). La UI que cambia con el tema (p. ej. el icono y el texto de `ThemeToggle`) se
  resuelve en CSS con las variantes `dark:`/`light:`, no con estado de React (así el HTML prerenderizado vale
  para ambos temas). Usar siempre los tokens semánticos de Tailwind, nunca colores literales:
  `bg-bg`, `bg-surface`, `bg-surface-2`, `border-border`, `text-fg`, `text-fg-muted`, `text-accent`,
  `bg-accent text-accent-fg`, `text-secondary`.
- **Paleta oscura:** bg `#0A0B0F`, surface `#13151B`, fg `#ECEAE4`, muted `#8C919B`, accent lima `#C8F542`,
  secondary azul `#5B8CFF`. **Clara:** bg `#F4F2ED`, fg `#14151A`, accent `#4A6A00`, secondary `#2D5BD8`.
- **Tipografías** (self-hosted vía `@fontsource-variable`): `font-display` Bricolage Grotesque (titulares),
  `font-sans` Geist (texto), `font-mono` JetBrains Mono (fechas, chips de tecnología, rol del hero).
- Móvil primero. Gutter lateral mínimo 16px (`px-4`).

## Rendimiento y accesibilidad (requisitos)

- Escena 3D (`components/three/`): `HeroGraph` pinta siempre el SVG (`Scene3DFallback`) y, si procede, carga
  `Scene3D` con `React.lazy` + `Suspense` cuando la página ha cargado (`useIdle`) **y** el usuario interactúa
  (`useFirstInteraction(can3D)`, sin el evento `scroll`: la restauración de scroll o un ancla no cuentan): la
  escena es interactiva y hasta entonces el SVG es equivalente. El fundido SVG → 3D
  empieza tras el primer fotograma renderizado (`onFirstFrame`), nunca en `onCreated`.
- 3D solo si (`useCan3D`): viewport ≥ 1024px, puntero fino (ratón), sin `prefers-reduced-motion`, con WebGL
  y dispositivo no modesto (`hardwareConcurrency`/`deviceMemory` > 4). En móvil no se descarga three.js.
- Render pausado (`frameloop="never"`) cuando el hero no es visible; `dpr` máx. 1.5 y baja a 1 si
  `PerformanceMonitor` detecta caída de FPS. En `useFrame` usar `state.camera`/`state.gl` (la regla
  `react-hooks/immutability` no permite mutar lo que devuelve `useThree`).
- El aviso "THREE.Clock has been deprecated" en consola viene de React Three Fiber, no del proyecto.
- Motion: `<LazyMotion features={…} strict>` + `<MotionConfig reducedMotion="user">` en `App.tsx`. Usar
  siempre componentes `m.*` (no `motion.*`, que fallaría por `strict`); las features (`domAnimation`) se cargan
  en diferido desde `lib/motionFeatures.ts`, así que **nada imprescindible puede depender de ellas** (podrían
  no haber llegado): el menú móvil y el botón de tema animan con CSS. Hoy Motion solo mueve `PipelineRail`.
- **Prerender + hidratación:** el HTML se genera en español en el build. `main.tsx` hidrata dentro de
  `startTransition` (troceada) si el idioma es `es`; si no, renderiza desde cero y retira `lang-pending`
  (el script inline lo retira igualmente a los 4 s por si el JS falla).
  Cada sección bajo el hero va en su propio `<Suspense>` para hidratar por partes.
  Cualquier valor que dependa del navegador (tema, matchMedia, localStorage…) debe usar
  `useSyncExternalStore` con `getServerSnapshot` o leerse en un efecto: si no, hay error de hidratación.
- **No usar `content-visibility: auto`** en las secciones: recorta los nodos del rail (contención de pintado)
  y descuadra la navegación por anclas.
- Medido en local (Lighthouse 13, Fase 5): móvil 95–96 / 100 / 100 / 100, escritorio 100 / 100 / 100 / 100.
  Las mediciones locales tienen mucho ruido según la carga del equipo: comparar siempre A/B y varias veces.
- Objetivo Lighthouse ≥ 90 en las cuatro categorías.
- HTML semántico, skip link, foco visible, navegación por teclado, modales con focus trap + Esc,
  `alt` en imágenes, contraste AA en ambos temas.

## SEO y metadatos

- `<head>` (description, canonical, Open Graph, Twitter, JSON-LD `Person`), `robots.txt` y `sitemap.xml` se
  generan en el prerender desde `src/data/` (`profile`, `site`, `education`, `skills`) y `locales/es.json`
  (`meta.*`). No duplicarlos a mano en `index.html`.
- `public/og-image.png` (1200×630), `favicon.svg`, `favicon-32.png` y `apple-touch-icon.png` se generaron
  renderizando HTML/SVG con Edge headless; si cambia el nombre, el rol o la paleta, regenerarlos.

## Despliegue

- `vite.config.ts` → `base: '/'` (repo de usuario).
- `.github/workflows/deploy.yml`: push a `main` → lint + format:check + build → GitHub Pages
  (Source: GitHub Actions).
- Pedir confirmación al usuario antes de hacer `git push` (publica la web).

## Forma de trabajar

- Por fases; commit descriptivo al final de cada una y enseñar el resultado antes de continuar.
- Ante dudas de diseño o contenido, preguntar en lugar de suponer.
- Mensajes de commit en español, formato `tipo: descripción` (feat, fix, chore, docs, style, refactor, perf).

## Glosario de traducción (ES → EN)

Fuente preferente para el inglés: el CV en inglés de Marcos (`public/cv/cv-en.pdf`).

| ES                                               | EN                                    | Estado                               |
| ------------------------------------------------ | ------------------------------------- | ------------------------------------ |
| Desarrollo de Aplicaciones Web (DAW)             | Web Development (DAW)                 | confirmado (CV EN)                   |
| Desarrollo de Aplicaciones Multiplataforma (DAM) | Multiplatform Development (DAM)       | confirmado (CV EN)                   |
| Bachillerato de Ciencias                         | Spanish Baccalaureate (Science track) | propuesto; Marcos corregirá el CV EN |
| Creación de contenidos asistida por IA           | AI-assisted Content Creation          | confirmado (CV EN)                   |
| Cliente: Bankinter                               | Client: Bankinter                     | confirmado (CV EN)                   |
| …y la entrega de proyectos (Loang)               | …and project delivery                 | confirmado: en ambos idiomas         |
