import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import path from 'path';

const HtmlFallbackPlugin = {
  name: 'html-fallback',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Only try to map to .html files for GET requests
      if (req.method !== 'GET') {
        next();
        return;
      }

      // Construct the expected HTML file path
      const htmlFilePath = path.join(__dirname, 'public', req.url + '.html');

      // Check if the file exists
      if (fs.existsSync(htmlFilePath)) {
        req.url += '.html';
      }

      next();
    });
  }
}
export default defineConfig({
  base: '',
  resolve: {
    alias: {
      'stream': 'stream-browserify'
    }
  },

  optimizeDeps: {
    include: [],
  },

  build: {
    target: 'esnext',
    minify: true,
    rollupOptions: {
      external: ['chalk'],
      input: {
        app: './inspector.html',
      },
      output: {
        assetFileNames: (assetInfo) => {
          // ... [Same code]
        },
        chunkFileNames: 'game/assets/js/[name]-[hash].js',
        entryFileNames: 'game/assets/js/[name]-[hash].js',
      },
      plugins: [
        commonjs(), // Move this here
        rollupNodePolyFill(),
        terser({
          format: {
            comments: false,
          },
        })
      ]
    }
  },
  server: {
    https: false,
    host: "0.0.0.0",
    port: 7777
  },
  plugins: [mkcert(), HtmlFallbackPlugin]
});