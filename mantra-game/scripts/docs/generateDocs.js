import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const exclude = ['.DS_Store', 'package.json'];




function generateDocumentation(inputDir, htmlOutputPath, mdOutputPath, linkPathBase, exclusions = ['.DS_Store', 'package.json']) {
  function generateTable(dir, depth = 0, isMarkdown = false) {
      let output = '';
      const files = fs.readdirSync(dir).filter(file => !exclusions.includes(file));

      if (depth === 0 && !isMarkdown) {
          output += '<table border="1">';
          output += '<tr><th>Plugin Name</th><th>Source</th></tr>';
      } else if (depth === 0 && isMarkdown) {
          output += '| Plugin Name | Source |\n| --- | --- |\n';
      }

      for (let file of files) {
          const filePath = path.join(dir, file);
          const stats = fs.statSync(filePath);
          if (stats.isDirectory()) {
              // Replace the initial directory path and backslashes (if on Windows) from filePath
              const relativePath = filePath.replace(inputDir, '').replace(/\\/g, '/');
              const linkUrl = `${linkPathBase}${relativePath}`;
              if (isMarkdown) {
                  output += `| ${'  &nbsp; '.repeat(depth)}└&nbsp;${file} | [📂](${linkUrl}) |\n`;
                  output += generateTable(filePath, depth + 1, isMarkdown);
              } else {
                  output += `<tr>
                                  <td style="padding-left: ${depth * 10}px;">${file}</td>
                                  <td><a href="${linkUrl}" target="_blank">📂</a></td>
                             </tr>`;
                  output += generateTable(filePath, depth + 1);
              }
          } else {
              //html += `<tr><td style="padding-left: ${depth * 20}px;">${file}</td></tr>`;
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