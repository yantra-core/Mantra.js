# Builds the browser bundle for mantra
browserify ./browser-shim.js --standalone MANTRA -o ./dist/mantra.head.bundle.js -t babelify

# Copies the browser bundle to the mantra-client project
cp ./dist/mantra.head.bundle.js ../mantra-client/public/mantra.head.bundle.js

# Copy the entire ./mantra-client/public folder to ./yantra.gg/public/mantra
cp -R ../mantra-client/public/ ../../../yantra.gg/public/mantra

# Copy the vendor folder to the root of yantra.gg
cp -R ../mantra-client/public/vendor/ ../../../yantra.gg/public/vendor

# Copies the browser bundle to the yantra.gg project
cp ./dist/mantra.head.bundle.js ../../../yantra.gg/public/mantra.head.bundle.js


#cp ./dist/mantra.head.bundle.js ../../../yantra.gg/public/mantra.head.bundle.js

# browserify ./browser-shim.js --standalone MANTRA -o ../mantra-client/public/mantra.head.bundle.js -t babelify