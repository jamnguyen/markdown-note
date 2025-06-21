import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import path from 'path';
import { readFileSync } from 'fs';

// Read package.json to get version
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: 'electron/main.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __APP_NAME__: JSON.stringify(packageJson.name),
  },
});
