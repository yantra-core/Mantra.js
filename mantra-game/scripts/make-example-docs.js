import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import generateDocs from './docs/generateDocs.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const exclude = ['.DS_Store', 'package.json'];

const inputDirectory = path.resolve(__dirname + '/../../mantra-client/public/examples');
const linkPath = 'https://yantra.gg/mantra/examples';

generateDocs({
  inputDir: inputDirectory,
  htmlOutputPath: 'examples.html',
  mdOutputPath: 'examples.md',
  linkPathBase: linkPath,
  showFiles: true,
  exclusions: ['.DS_Store', 'package.json', 'node_modules'] // This is optional, the default is ['.DS_Store', 'package.json']
});
