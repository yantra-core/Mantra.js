# Builds the browser bundle for sutras.mantra
browserify ./browser-shim.js --standalone SUTRAS -o ./dist/sutras.mantra.js -t babelify

# Minifies the generated bundle and creates a source map
uglifyjs ./dist/sutras.mantra.js --compress --mangle --source-map "url='sutras.mantra.min.js.map',root='../',includeSources" -o ./dist/sutras.mantra.min.js

# Copy the sutras.mantra.js file to ./examples/browser
# cp ./dist/sutras.mantra.js ./browser/sutras.mantra.js

# Copy the sutras.mantra.js file to ../mantra/mantra-client/public
cp ./dist/sutras.mantra.js ../mantra-client/public/sutras.mantra.js

# Copy the sutras.mantra.js file to ../yantra.gg/public/js
cp ./dist/sutras.mantra.js ../../yantra.gg/public/sutras.mantra.js
# Copy the sutras.mantra.min.js file to ../yantra.gg/public/js
cp ./dist/sutras.mantra.min.js ../../yantra.gg/public/sutras.mantra.min.js

# Copy the ./examples/browser folder to ../yantra.gg/public/sutras.mantra
# cp -r ./examples/browser/ ../yantra.gg/public/sutras.mantra


