import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const publicDirPath = path.join(__dirname, 'public/examples'); // path to your public folder
const distDirPath = path.join(__dirname, 'public/examples'); // path to your dist folder
const baseUrl = '/examples/'; // Set your base URL path here

console.log('publicDirPath', publicDirPath);
console.log('distDirPath', distDirPath);

// Array of file and directory names to exclude from indexing
const exclude = ['.DS_Store', 'node_modules'];

// Function to recursively generate index.html files
function generateIndexFiles(dir) {
  const items = fs.readdirSync(dir).filter(item => !exclude.includes(item));

  // Generate an index.html if it does not exist
  if (true || !items.includes('index.html')) {
    let content = `<html><head><title>Index of ${path.relative(publicDirPath, dir)}</title></head><body><h1>Index of ${path.relative(publicDirPath, dir)}</h1><ul>`;
    for (const item of items) {
      if (item === 'index.html') continue; // Skip index.html (we're generating it!
      // Create a path relative to publicDirPath, not distDirPath
      const itemRelativePath = path.relative(publicDirPath, path.join(dir, item));
      console.log("itemRelativePath", itemRelativePath)
      const stat = fs.statSync(path.join(dir, item));
      if (stat.isDirectory()) {
        generateIndexFiles(path.join(dir, item)); // Recurse into subdirectories
        content += `<li><a href="${baseUrl}${itemRelativePath}/">${item}/</a></li>`;
      } else {
        content += `<li><a href="${baseUrl}${itemRelativePath}">${item}</a></li>`;
      }
    }
    content += `</ul></body></html>`;
    console.log("writing path", path.join(dir, 'index.html'))
    fs.writeFileSync(path.join(dir, 'index.html'), content);
  }

  // Process subdirectories
  for (const item of items) {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      generateIndexFiles(itemPath); // Recurse into subdirectories
    }
  }
}

// Start the process from the public directory
generateIndexFiles(publicDirPath);

// After generating index files, you'd copy over the `public` directory to `dist`
// or integrate this into your existing build process where appropriate.
