# browserify ./browser-shim.js --standalone MANTRA -o ../mantra-client/public/Game.bundle.js -t babelify
browserify ./browser-shim.js --standalone MANTRA -o ./dist/mantra.head.bundle.js -t babelify
browserify ./browser-shim.js --standalone MANTRA -o ../mantra-client/public/mantra.head.bundle.js -t babelify