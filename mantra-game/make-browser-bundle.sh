### make-browser-bundle.sh - builds the browser bundle for mantra
### Running this script will build the browser bundles for mantra
### There are additional steps to copy files for yantra.gg and starter-blueprint
### You can comment out those lines if you don't need them

###

### Mantra specific builds ( @yantra-core/mantra )

###

# Builds the browser bundle for mantra
browserify ./browser-shim.js --standalone MANTRA -o ./dist/mantra.js -t babelify
uglifyjs ./dist/mantra.js -o ./dist/mantra.min.js -c -m


# Copies the browser bundle to the mantra-client project
cp ./dist/mantra.js ../mantra-client/public/mantra.js
cp ./dist/mantra.min.js ../mantra-client/public/mantra.min.js

# Copies the categories and prism files ( for now )
cp ../mantra-examples/public/prism.min.js ../mantra-client/public/prism.min.js
cp ../mantra-examples/public/prism.css ../mantra-client/public/prism.css
cp ../mantra-examples/public/categories.js ../mantra-client/public/categories.js

# Copies the browser bundle the mantra-examples project
# cp ./dist/mantra.js ../mantra-examples/public/mantra.js

# Copies the browser bundle to the mantra-examples project
cp ./dist/mantra.js ../mantra-examples/public/mantra.js
cp ./dist/mantra.min.js ../mantra-examples/public/mantra.min.js

# Copies the entire mantra-examples/public to ../mantra-client/public/v1
cp -R ../mantra-examples/public/ ../mantra-client/public/examples


# Copies the worker-matter.js to the mantra-client project
cp ./dist/worker-matter.js ../mantra-client/public/worker-matter.js

########################################################

###

###  Starter Blueprint builds ( @yantra-core/starter-blueprint )

###

# copy all the examples to ../starter-blueprint/client
# cp -R ../mantra-client/public/ ../../starter-blueprint/client

# copy the browser bundle to the starter-blueprint
cp ./dist/mantra.js ../../starter-blueprint/client/mantra.js
cp ./dist/mantra.min.js ../../starter-blueprint/client/mantra.min.js
cp  ../mantra-client/public/mantra.css ../../starter-blueprint/client/mantra.css

cp  ../mantra-client/public/mantra.css ../mantra-examples/mantra.css


########################################################

###

### Yantra.gg specific builds, *not* required for mantra / local development

###

# Copy the entire ./mantra-client/public folder to ./yantra.gg/public/mantra
cp -R ../mantra-client/public/ ../../yantra.gg/public/mantra

# Copy the vendor folder to the root of yantra.gg
cp -R ../mantra-client/public/vendor/ ../../yantra.gg/public/vendor

cp -R ../mantra-client/public/img/ ../../yantra.gg/public/img/

# Copies the browser bundle to the yantra.gg root
# cp ./dist/mantra.js ../../yantra.gg/dist/mantra.js
cp ./dist/mantra.js ../../yantra.gg/public/mantra.js
cp  ../mantra-client/public/mantra.css ../../yantra.gg/public/mantra.css

# Copies yantra discovery library to yantra.gg root
cp ../mantra-client/public/yantra.js ../../yantra.gg/public/yantra.js

# copies mantra-examples/public to yantra.gg/public/mantra/v1
cp -R ../mantra-examples/public/ ../../yantra.gg/public/mantra/examples