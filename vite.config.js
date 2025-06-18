import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  base: '/state-fair-app/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'vue-app': path.resolve(__dirname, 'src/static/vue-app.js'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
    emptyOutDir: false, // Don't delete static HTML/CSS
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
}); 