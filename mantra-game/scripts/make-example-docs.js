import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import generateDocs from './docs/generateDocs.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const exclude = ['.DS_Store', 'package.json'];



// Usage:
const inputDirectory = path.resolve(__dirname + '/../../mantra-client/public/examples');
const linkPath = 'https://github.com/yantra-core/mantra/tree/master/mantra-client/public/examples';
generateDocs(inputDirectory, 'examples.html', 'examples.md', linkPath);
