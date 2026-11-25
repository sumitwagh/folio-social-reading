import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 5172, open: true },
  preview: { port: 6172 },
  build: { target: 'es2022' },
});
