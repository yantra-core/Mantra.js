import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Refactored generateDocumentation to accept an options object
function generateDocumentation(options) {
  const {
    inputDir,
    htmlOutputPath,
    mdOutputPath,
    linkPathBase,
    exclusions = ['.DS_Store', 'package.json'],
  } = options;

  function generateTable(dir, depth = 0, isMarkdown = false) {
    let output = '';
    const files = fs.readdirSync(dir).filter(file => !exclusions.includes(file));

    if (depth === 0) {
      output += isMarkdown ? '| Plugin Name | Source |\n| --- | --- |\n' : '<table border="1"><tr><th>Plugin Name</th><th>Source</th></tr>';
    }

    for (let file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        const relativePath = filePath.replace(inputDir, '').replace(/\\/g, '/');
        const linkUrl = `${linkPathBase}${relativePath}`;
        if (isMarkdown) {
          output += `| ${'  '.repeat(depth * 4)}└ ${file} | [📂](${linkUrl}) |\n`;
          output += generateTable(filePath, depth + 1, isMarkdown);
        } else {
          output += `<tr><td style="padding-left: ${depth * 10}px;">${file}</td><td><a href="${linkUrl}" target="_blank">📂</a></td></tr>`;
          output += generateTable(filePath, depth + 1);
        }
      } else {
        const linkUrl = `${linkPathBase}/${dir}/${file}`;
        // remove inputDir from file path
        const linkPath = linkUrl.replace(inputDir, '');
        // remove .html extension from file name
        const displayName = file.replace('.html', '');

        if (isMarkdown) {
          output += `| ${'  '.repeat(depth * 4)}└ ${linkPath} | [📄](${linkUrl}) |\n`;
        } else {
          output += `<tr><td style="padding-left: ${depth * 10}px;">${file}</td><td><a href="${linkPath}" target="_blank">📄</a></td></tr>`;
        }
      }
    }

    if (depth === 0 && !isMarkdown) {
      output += '</table>';
    }

    return output;
  }

  const htmlOutput = generateTable(inputDir);
  const mdOutput = generateTable(inputDir, 0, true);
  fs.writeFileSync(htmlOutputPath, htmlOutput);
  fs.writeFileSync(mdOutputPath, mdOutput);
}

export default generateDocumentation;
