import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pages({
      dirs: [
        {
          dir: './src/pages',
          baseRoute: ''
        }
      ],
      exclude: ['**/components/*.*']
    }),
    layouts({
      layoutsDirs: 'src/layouts',
      pagesDirs: 'src/pages',
      defaultLayout: 'AppLayout'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  server: {
    port: 8080,
    host: true
  }
});
