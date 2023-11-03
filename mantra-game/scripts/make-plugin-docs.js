import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import generateDocs from './docs/generateDocs.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const exclude = ['.DS_Store', 'package.json'];

const inputDirectory = path.resolve(__dirname + '/../plugins');
const linkPath = 'https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins';


generateDocs({
  inputDir: inputDirectory,
  htmlOutputPath: 'plugins.html',
  mdOutputPath: 'plugins.md',
  linkPathBase: linkPath,
  exclusions: ['.DS_Store', 'package.json', 'node_modules'] // This is optional, the default is ['.DS_Store', 'package.json']
});
