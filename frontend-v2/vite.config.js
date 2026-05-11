import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'villas-del-este': resolve(__dirname, 'proyectos/villas-del-este/index.html'),
        // 'villas-del-oeste': resolve(__dirname, 'proyectos/villas-del-oeste/index.html'),
        // 'ciudad-del-este': resolve(__dirname, 'proyectos/ciudad-del-este/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    allowedHosts: ['dai6i2-ip-190-123-239-147.tunnelmole.net'],
  },
});
