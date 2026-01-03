import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    middlewareMode: false,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.startsWith('/api')) {
          return next();
        }
        if (req.url.includes('.')) {
          return next();
        }
        req.url = '/';
        next();
      });
    },
  },
});