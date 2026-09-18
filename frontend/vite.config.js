import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Enables relative paths so it works when directly opened or served
  server: {
    port: 5173,
    host: true
  }
});