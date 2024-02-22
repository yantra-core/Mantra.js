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
function generateGalleryFile() {
    const galleryTemplatePath = path.join(__dirname, 'gallery_template.html');
    const galleryHTMLPath = path.join(outputDir, 'gallery.html');
    const galleryTemplate = fs.readFileSync(galleryTemplatePath, 'utf8');

    // Generate JSON array of example URLs
    let exampleURLs = examples.map(example => example.url);
    exampleURLs = exampleURLs.reverse();

    // push the first 10 or so in manual display order for demo purposes
    exampleURLs.unshift('collisions/collision-active.html');
    exampleURLs.unshift('collisions/collision-start.html');
    exampleURLs.unshift('physics/set-position.html');
    exampleURLs.unshift('npc/hexapod.html');
    exampleURLs.unshift('physics/rotate.html');
    
    const exampleURLsJSON = JSON.stringify(exampleURLs);
    const jsCode = `
    const exampleURLs = ${exampleURLsJSON}; // Assuming exampleURLsJSON is defined elsewhere
    let currentIndex = 0;
    let intervalId;
    let countdownValue = 5; // 5-second countdown
    let isPlaying = true;
    
    function cycleExamples(direction = 'forward') {
        const frame = document.getElementById('exampleFrame');
        const title = document.getElementById('exampleTitle');
        const nextPreview = document.getElementById('nextPreview');
        const prevPreview = document.getElementById('prevPreview');
        const dropdown = document.getElementById('exampleDropdown');
    
        if (direction === 'forward') {
            currentIndex = (currentIndex + 1) % exampleURLs.length;
        } else if (direction === 'backward') {
            currentIndex = (currentIndex - 1 + exampleURLs.length) % exampleURLs.length;
        }
    
        const currentUrl = exampleURLs[currentIndex];
        frame.src = currentUrl;


        // Extract a meaningful part of the URL, for example, the filename without extension
        const urlSegment = currentUrl.split('/').pop().split('.html')[0];
        // TODO: enable push state to example links
        //let pushSegement = currentUrl.replace('.html', '');
        // Update the browser's URL to reflect the current example, using a hash or query parameter
        //window.history.pushState({}, '', pushSegement); // or '?example=' + urlSegment for query parameters
    
        const titleText = currentUrl.split('/').pop().replace('.html', '').replace(/-/g, ' ');
        title.textContent = 'Currently Viewing: ' + titleText;
    
        const nextIndex = (currentIndex + 1) % exampleURLs.length;
        const nextUrl = exampleURLs[nextIndex];
        const nextTitleText = nextUrl.split('/').pop().replace('.html', '').replace(/-/g, ' ');
        nextPreview.textContent = 'Up Next: ' + nextTitleText;
    
        if (currentIndex === 0) {
            prevPreview.style.display = 'none';
        } else {
            prevPreview.style.display = '';
            const prevIndex = (currentIndex - 1 + exampleURLs.length) % exampleURLs.length;
            const prevUrl = exampleURLs[prevIndex];
            const prevTitleText = prevUrl.split('/').pop().replace('.html', '').replace(/-/g, ' ');
            prevPreview.textContent = 'Previously: ' + prevTitleText;
        }
    
        // Update dropdown to show the current example
        dropdown.selectedIndex = currentIndex + 1; // +1 because the first option is "Select an Example"
    
        resetCountdown();
    }
    
    function updateCountdown() {
        const countdown = document.getElementById('countdown');
        countdown.textContent = countdownValue;
        countdownValue--;
    
        if (countdownValue < 0) {
            cycleExamples();
        }
    }
    
    function resetCountdown() {
        countdownValue = 5; // Reset to 5 seconds
        updateCountdown();
    }
    
    function togglePlayPause(forcePause = false) {
        const btn = document.getElementById('playPauseBtn');
        isPlaying = forcePause ? false : !isPlaying;
    
        btn.textContent = isPlaying ? 'Pause' : 'Play';
        if (isPlaying) {
            intervalId = setInterval(updateCountdown, 1000);
        } else {
            clearInterval(intervalId);
        }
    }
    
    document.addEventListener('click', () => {
        togglePlayPause(true); // Pause the timer on any document click
    });
    
    document.getElementById('playPauseBtn').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the document click event from firing
        togglePlayPause();
    });
    
    document.getElementById('nextPreview').addEventListener('click', (e) => {
        e.stopPropagation();
        cycleExamples('forward');
    });
    
    document.getElementById('prevPreview').addEventListener('click', (e) => {
        e.stopPropagation();
        cycleExamples('backward');
    });
    
    function populateDropdown() {
        const dropdown = document.getElementById('exampleDropdown');
        exampleURLs.forEach((url, index) => {
            const option = document.createElement('option');
            const title = url.split('/').pop().replace('.html', '').replace(/-/g, ' ');
            option.text = title;
            option.value = index;
            dropdown.appendChild(option);
        });
    }
    
    function loadSelectedExample() {
        const dropdown = document.getElementById('exampleDropdown');
        const selectedValue = dropdown.value;
    
        if (selectedValue) {
            currentIndex = parseInt(selectedValue, 10);
            togglePlayPause(true); // Force pause when selecting from dropdown
            cycleExamples();
        }
    }
    
    document.getElementById('exampleDropdown').addEventListener('change', loadSelectedExample);
    
    function startGallery() {
        populateDropdown();
        intervalId = setInterval(updateCountdown, 1000);
        cycleExamples();
    }
    
    startGallery();
    
`;

    // Replace placeholders in the template with actual content
    const finalHTML = galleryTemplate.replace('$$$jsCode$$$', jsCode);

    // Write the final HTML to the gallery.html file
    fs.writeFileSync(galleryHTMLPath, finalHTML, 'utf8');
    console.log('gallery.html file generated successfully.');
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
    <style>
        body {
            overflow: auto;
        }
        /* This will force the scrollbar to be always visible */
        ::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 7px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: rgba(0,0,0,.5);
            -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
        }

        iframe {
            min-height: 600px;
            min-width: 800px;
            width: 100%;
            height: 50%;
            border: 1px solid #000;
            margin-top: 20px;
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // rebroadcast the message to the parent window
            window.addEventListener('message', event => {
                // log the data
                console.log(event.data);
                let context = event.data.context;
                window.parent.postMessage({ type: 'pointerDown', context: context }, '*');
              });

            // on click
            window.addEventListener('click', event => {
                // log the data
                console.log(event);
                let context = { x: event.clientX, y: event.clientY };
                window.parent.postMessage({ type: 'pointerDown', context: context }, '*');
            });
          
            loadEditor('./${name}.js');
        });
    </script>
    <iframe src="../demo.html?source=${path}"></iframe>
    <script src="../prism.min.js"></script>
</html>
    `;
}

function exampleTemplateJS(example) {
    return `
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
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

        if (!fs.existsSync(exampleHTMLPath)) {}
        // regen the HTML file each time
        fs.writeFileSync(exampleHTMLPath, exampleTemplateHTML(example), 'utf8');

        
        // do not overwrite the js example code if it already exists
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

generateGalleryFile(); // Add this line to generate the gallery page
