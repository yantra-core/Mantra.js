# Builds the browser bundle for worlds.mantra
browserify ./browser-shim.js --standalone WORLDS -o ./dist/worlds.mantra.js -t babelify

# Minifies the generated bundle and creates a source map
uglifyjs ./dist/worlds.mantra.js --compress --mangle --source-map "url='worlds.mantra.min.js.map',root='../',includeSources" -o ./dist/worlds.mantra.min.js

# Copy the worlds.mantra.js file to ./examples/browser
# cp ./dist/worlds.mantra.js ./browser/worlds.mantra.js

# Copy the worlds.mantra.js file to ../mantra/mantra-client/public
cp ./dist/worlds.mantra.js ../mantra-client/public/worlds.mantra.js

# Copy the worlds.mantra.js file to ../yantra.gg/public/js
cp ./dist/worlds.mantra.js ../../yantra.gg/public/worlds.mantra.js
# Copy the worlds.mantra.min.js file to ../yantra.gg/public/js
cp ./dist/worlds.mantra.min.js ../../yantra.gg/public/worlds.mantra.min.js

# Copy the ./examples/browser folder to ../yantra.gg/public/worlds.mantra
# cp -r ./examples/browser/ ../yantra.gg/public/worlds.mantra


