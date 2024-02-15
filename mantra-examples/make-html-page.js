import { categories, examples } from './data/categories.js';

import fs from 'fs';
import path from 'path';

// Directory where the HTML files will be saved
const __dirname = path.dirname(new URL(import.meta.url).pathname);

//
// Generates the HTML index page for each category
//
function generateCategoryHTML(category) {
  const categoryExamples = examples.filter(example => example.category === category.name);

  let categoryHTML = `<div class="categories">`;

  categoryExamples.forEach(example => {
    categoryHTML += `
    <a class="staticExampleLink" href="${example.url}">
      <div class="category" style="background-color: ${category.color};">
        <span class="categoryExample">${category.title}</span>
        <p>${example.description}</p>
        <h3>${example.title}</h3>
      </div></a>`;
  });

  categoryHTML += `</div>`;
  return categoryHTML;
}

const outputDir = path.join(__dirname, 'public');
//let outputDir = __dirname;

let indexTemplate = fs.readFileSync(path.join(__dirname, '/_template.html'), 'utf8');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir, { recursive: true });
}
categories.forEach(category => {
  let str = new String(indexTemplate); // Assuming indexTemplate is your base HTML template string
  const categoryHTML = generateCategoryHTML(category);

  // filePath should dervive from category.url, just remove the .html and replace with .html
  const filePath = path.join(outputDir, `${category.url}`);

  //const filePath = path.join(outputDir, `${category.title.toLowerCase().replace(/\s+/g, '-')}.html`);
  
  let mantraGameDevFrameworksTags = [
    'javascript game development',
    'html5 game development',
    'webgl game development',
    'css game development',
    'css3 game development',
    'canvas game development',
    'web game development',
    'browser game development',
    'browser based game development',
    'browser games'
  ];

  str = str.replace('$$$categories$$$', categoryHTML);
  str = str.replace('$$$title$$$', 'Mantra - Examples - ' + category.title);

  // Combine category-specific tags with general game development tags and create a single keywords meta tag
  const combinedTags = [...category.tags, ...mantraGameDevFrameworksTags].join(', ');
  const metaKeywordsTag = `<meta name="keywords" content="${combinedTags}">`;
  // Create a description meta tag using the category description
  const metaDescriptionTag = `<meta name="description" content="${category.description}">`;
  // Insert meta tags into the template
  str = str.replace('$$$meta$$$', `${metaKeywordsTag}\n${metaDescriptionTag}`);

  // Generate simple html spans as tags for each tag in category.tags array
  const htmlTags = category.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n');
  str = str.replace('$$tags$$$', htmlTags);

  console.log(str); // For debugging, to see the final HTML string

  fs.writeFile(filePath, str, err => {
    if (err) {
      console.error(`Error writing file for category ${category.title}:`, err);
    } else {
      console.log(`File written for category ${category.title}: ${filePath}`);
    }
  });
});

// Function to generate HTML content for the main categories
function generateMainCategoriesHTML(categories) {
  let categoriesHTML = `<div class="categories">`;

  categories.forEach(category => {
    categoriesHTML += `
    <a class="staticExampleLink" href="${category.url}">
      <div class="category" style="background-color: ${category.color};">
        <span class="categoryExample">${category.title}</span>
        <p>${category.description}</p>
        <h3>${category.title}</h3>
      </div>
    </a>`;
  });

  categoriesHTML += `</div>`;
  return categoriesHTML;
}

// Generate the main categories HTML
const mainCategoriesHTML = generateMainCategoriesHTML(categories);
console.log("mainCategoriesHTML", mainCategoriesHTML)

// Create index.html content by replacing the placeholder with main categories HTML
let indexHTML = indexTemplate.replace('$$$categories$$$', mainCategoriesHTML);
indexHTML = indexHTML.replace('$$$title$$$', 'Mantra - Examples - Main Categories');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the index.html file
const indexPath = path.join(outputDir, 'index.html');
fs.writeFile(indexPath, indexHTML, err => {
  if (err) {
    console.error('Error writing index.html:', err);
  } else {
    console.log('index.html file written successfully.');
  }
});

// read the contents of ./data/categories.js, remove the last line, and write to ./public/categories.js
const categoriesPath = path.join(__dirname, '/data/categories.js');
let categoriesData = fs.readFileSync(categoriesPath, 'utf8');
categoriesData = categoriesData.split('\n').slice(0, -1).join('\n');
fs.writeFileSync(path.join(outputDir, 'categories.js'), categoriesData, 'utf8');


// TODO: in addition we wish to generate a .html and .js file for each example ( assuming one doesn't already exist )
// the .html file will contain this template:
function exampleTemplateHolder (example) {

  let html = ```
  <html>
    <link href="../prism.css" rel="stylesheet" />
    <script src="../code-editor.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        loadEditor('./${example.name}js');
      });
    </script>
    <iframe src="../demo.html?source=${example.path}" width="100%" height="50%"></iframe>
    <script src="../prism.min.js"></script>
  </html>
  ```;

  return html;

}

// the .js file will contain this template:
function exampleTemplateJS (example) {

  let js = ```
  let game = new MANTRA.Game({
    graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  });
  game.start();
  ```;
  return js;
}