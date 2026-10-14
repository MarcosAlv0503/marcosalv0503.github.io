import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

/**
 * Añade <link rel="preload"> para las fuentes indicadas (nombres con hash de Vite).
 * Se precarga solo la fuente del titular del hero, que es el elemento LCP.
 */
function preloadFonts(patterns: RegExp[]): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml(_html, ctx) {
      if (!ctx.bundle) return;
      return Object.keys(ctx.bundle)
        .filter((file) => patterns.some((pattern) => pattern.test(file)))
        .map((file) => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'font',
            type: 'font/woff2',
            href: `/${file}`,
            crossorigin: '',
          },
          injectTo: 'head' as const,
        }));
    },
  };
}

// Repositorio de usuario (<usuario>.github.io) → se sirve desde la raíz.
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    preloadFonts([/bricolage-grotesque-latin-wght-normal-[\w-]+\.woff2$/]),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
