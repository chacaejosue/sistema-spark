import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  output: 'static',
  vite: {
    // Astro and the Tailwind Vite plugin can expose different Vite type copies.
    // The plugin remains compatible at runtime.
    // @ts-expect-error Vite plugin type versions are provided by different packages.
    plugins: [tailwindcss()],
  },
})
