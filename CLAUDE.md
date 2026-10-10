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
npm run build         # tsc -b + vite build → dist/
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
  lib/         Utilidades puras (formatDate…)
  styles/      index.css (tokens + Tailwind)
```

- **Cero texto hardcodeado en componentes.** Texto traducible → `src/locales/{es,en}.json`, enlazado por `id`
  (p. ej. `experience.loang.description`). Datos neutros (fechas, tecnologías, URLs) → `src/data/*.ts`.
  Excepciones: nombres propios y tecnologías.
- Fechas en ISO (`'2026-03'`) y formateadas con `Intl.DateTimeFormat` según el idioma activo. `end: null` =
  actualidad.
- Un componente por archivo, `export default` para componentes de sección; nombres en PascalCase.
- Imports con alias `@/` → `src/`.
- Mantener `es.json` y `en.json` con las mismas claves.

## i18n

- ES/EN. Idioma inicial = navegador, fallback `es`. La elección se guarda en `localStorage` (`lang`).
- Al cambiar de idioma se actualiza `<html lang>`.
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
- Motion: un único momento orquestado (entrada del hero: nombre por líneas + grafo que se dibuja) +
  respuestas a acciones (menú móvil, selector de idioma, tema) y el pipeline activándose con el scroll
  (`PipelineRail` + `usePassed`, línea de lectura al 55 % de la ventana). Nada de fade-up genérico por sección.

- **Tema:** oscuro por defecto, claro opcional (toggle). Se controla con `data-theme` en `<html>`; guardado
  en `localStorage` (`theme`). Usar siempre los tokens semánticos de Tailwind, nunca colores literales:
  `bg-bg`, `bg-surface`, `bg-surface-2`, `border-border`, `text-fg`, `text-fg-muted`, `text-accent`,
  `bg-accent text-accent-fg`, `text-secondary`.
- **Paleta oscura:** bg `#0A0B0F`, surface `#13151B`, fg `#ECEAE4`, muted `#8C919B`, accent lima `#C8F542`,
  secondary azul `#5B8CFF`. **Clara:** bg `#F4F2ED`, fg `#14151A`, accent `#4A6A00`, secondary `#2D5BD8`.
- **Tipografías** (self-hosted vía `@fontsource-variable`): `font-display` Bricolage Grotesque (titulares),
  `font-sans` Geist (texto), `font-mono` JetBrains Mono (fechas, chips de tecnología, rol del hero).
- Móvil primero. Gutter lateral mínimo 16px (`px-4`).

## Rendimiento y accesibilidad (requisitos)

- Escena 3D (`components/three/`): `HeroGraph` pinta siempre el SVG (`Scene3DFallback`) y, si procede, carga
  `Scene3D` con `React.lazy` + `Suspense` cuando el navegador está libre (`useIdle`). El fundido SVG → 3D
  empieza tras el primer fotograma renderizado (`onFirstFrame`), nunca en `onCreated`.
- 3D solo si (`useCan3D`): viewport ≥ 1024px, puntero fino (ratón), sin `prefers-reduced-motion`, con WebGL
  y dispositivo no modesto (`hardwareConcurrency`/`deviceMemory` > 4). En móvil no se descarga three.js.
- Render pausado (`frameloop="never"`) cuando el hero no es visible; `dpr` máx. 1.5 y baja a 1 si
  `PerformanceMonitor` detecta caída de FPS. En `useFrame` usar `state.camera`/`state.gl` (la regla
  `react-hooks/immutability` no permite mutar lo que devuelve `useThree`).
- El aviso "THREE.Clock has been deprecated" en consola viene de React Three Fiber, no del proyecto.
- Motion bajo `<MotionConfig reducedMotion="user">` (en `App.tsx`); las entradas usan además
  `useReducedMotion()` para no partir de `initial` oculto.
- Objetivo Lighthouse ≥ 90 en las cuatro categorías.
- HTML semántico, skip link, foco visible, navegación por teclado, modales con focus trap + Esc,
  `alt` en imágenes, contraste AA en ambos temas.

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
