/*

our example data looks like this:

 {
    title: 'Create Entity',
    category: 'entity',
    description: 'Create a new entity.',
    image: 'placeholder-image.jpg',
    url: 'entity/create-entity.html',
    tags: ['create', 'entity', 'scene', 'add', 'new', 'instance', 'object', 'prefab', 'clone', 'copy', 'duplicate']
  },

  We wish to support this syntax ( in addition to the existing syntax ):


   {
    title: 'Create Entity',
    category: ['entity', 'physics'],
    description: 'Create a new entity.',
    image: 'placeholder-image.jpg',
    url: 'entity/create-entity.html',
    tags: ['create', 'entity', 'scene', 'add', 'new', 'instance', 'object', 'prefab', 'clone', 'copy', 'duplicate']
  },

*/

import { categories, examples } from './data/categories.js';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const outputDir = path.join(__dirname, 'public');
const indexTemplate = fs.readFileSync(path.join(__dirname, '/_template.html'), 'utf8');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function generateCategoryHTML(category) {
    const categoryExamples = examples.filter(example => {
        return Array.isArray(example.category) ? example.category.includes(category.name) : example.category === category.name;
    });

    let categoryHTML = `<div class="categories">`;

    categoryExamples.forEach(example => {
        let exampleCategoryColor = category.color; // Default to current category color

        if (Array.isArray(example.category) && example.category.length > 1) {
            // Determine the category to use based on the current category's position in the list
            const currentCategoryIndex = example.category.indexOf(category.name);
            let nextCategoryName;

            if (currentCategoryIndex === 0) {
                // Current category is the first in the list, use the second category's color
                nextCategoryName = category.color;
            } else {
                // Current category is not the first, use the first category's color
                nextCategoryName = example.category[0];
            }

            const nextCategory = categories.find(cat => cat.name === nextCategoryName);
            exampleCategoryColor = nextCategory ? nextCategory.color : category.color;
        }

        categoryHTML += `
    <a class="staticExampleLink" href="${example.url}">
      <div class="category" style="background-color: ${exampleCategoryColor};">
        <span class="categoryExample">${category.title}</span>
        <p>${example.description}</p>
        <h3>${example.title}</h3>
      </div>
    </a>`;
    });

    categoryHTML += `</div>`;
    return categoryHTML;
}


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

function writeCategoryFiles() {
    categories.forEach(category => {
        let str = new String(indexTemplate);
        const categoryHTML = generateCategoryHTML(category);
        const filePath = path.join(outputDir, `${category.url}`);

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

        const combinedTags = [...category.tags, ...mantraGameDevFrameworksTags].join(', ');
        const metaKeywordsTag = `<meta name="keywords" content="${combinedTags}">`;
        const metaDescriptionTag = `<meta name="description" content="${category.description}">`;
        str = str.replace('$$$meta$$$', `${metaKeywordsTag}\n${metaDescriptionTag}`);

        const htmlTags = category.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n');
        str = str.replace('$$tags$$$', htmlTags);

        fs.writeFile(filePath, str, err => {
            if (err) {
                console.error(`Error writing file for category ${category.title}:`, err);
            } else {
                console.log(`File written for category ${category.title}: ${filePath}`);
            }
        });
    });
}

function writeIndexFile() {
    const mainCategoriesHTML = generateMainCategoriesHTML(categories);
    let indexHTML = indexTemplate.replace('$$$categories$$$', mainCategoriesHTML);
    indexHTML = indexHTML.replace('$$$title$$$', 'Mantra - Examples - Main Categories');

    const indexPath = path.join(outputDir, 'index.html');
    fs.writeFile(indexPath, indexHTML, err => {
        if (err) {
            console.error('Error writing index.html:', err);
        } else {
            console.log('index.html file written successfully.');
        }
    });
}

function copyCategoriesData() {
    const categoriesPath = path.join(__dirname, '/data/categories.js');
    let categoriesData = fs.readFileSync(categoriesPath, 'utf8');
    categoriesData = categoriesData.split('\n').slice(0, -1).join('\n');
    fs.writeFileSync(path.join(outputDir, 'categories.js'), categoriesData, 'utf8');
}

function exampleTemplateHTML(example) {
    let path = example.url.replace('.html', '');
    let name = path.split('/').pop();
    return `
<html>
    <link href="../prism.css" rel="stylesheet" />
    <script src="../code-editor.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            loadEditor('./${name}.js');
        });
    </script>
    <iframe src="../demo.html?source=${path}" width="100%" height="50%"></iframe>
    <script src="../prism.min.js"></script>
</html>
    `;
}

function exampleTemplateJS(example) {
    return `
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
});
game.start();
    `;
}

function generateExampleFiles() {
    examples.forEach(example => {
        // example.url looks like: 'inputs/mouse.html', for example
        // Extract the base name without the extension to use for both .html and .js files
        const baseName = path.basename(example.url, '.html'); // Removes the '.html' extension

        // Construct the directory path based on the URL, subtracting the file name
        const dirPath = path.join(outputDir, path.dirname(example.url));

        // Ensure the directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const exampleHTMLPath = path.join(dirPath, `${baseName}.html`);
        const exampleJSPath = path.join(dirPath, `${baseName}.js`);

        if (!fs.existsSync(exampleHTMLPath)) {
            fs.writeFileSync(exampleHTMLPath, exampleTemplateHTML(example), 'utf8');
        }

        if (!fs.existsSync(exampleJSPath)) {
            fs.writeFileSync(exampleJSPath, exampleTemplateJS(example), 'utf8');
        }
    });
}

// Main script execution
writeCategoryFiles();
writeIndexFile();
copyCategoriesData();
generateExampleFiles();
