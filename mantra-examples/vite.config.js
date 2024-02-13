import { defineConfig } from 'vite';
// import rollupNodePolyFill from 'rollup-plugin-polyfill-node';
// import terser from '@rollup/plugin-terser';
// import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import path from 'path';

/*
import plugins from '../mantra-game/plugins.js';

console.log('plugins', plugins)

const registerPluginsGlobalNamespace = {
  name: 'register-plugins-global-namespace',
  generateBundle(options, bundle) {
    for (const [fileName, fileInfo] of Object.entries(bundle)) {
      if (fileInfo.type === 'chunk') {
        const pluginName = path.basename(fileName, '.js');
        fileInfo.code = `window.PLUGINS = window.PLUGINS || {}; window.PLUGINS['${pluginName}'] = (function(){ ${fileInfo.code} })();`;
      }
    }
  }
};
*/

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

      if (req.url === '/') {
        req.url = '/index.html';
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
      ]
    }
  },
  server: {
    https: false,
    host: "0.0.0.0",
    port: 8888
  },
  plugins: [HtmlFallbackPlugin]
});