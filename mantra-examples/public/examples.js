let categories = [
  {
    title: 'Physics',
    description: 'Explore examples featuring the physics engine.',
    image: 'placeholder-image.jpg',
    url: 'physics.html',
    tags: ['physics', 'engine', 'motion', 'movement', 'gravity', 'force', 'velocity', 'mass', 'acceleration', 'inertia', 'friction']
  },
  {
    title: 'Graphics',
    description: 'Explore examples featuring the graphics engine.',
    image: 'placeholder-image.jpg',
    url: 'graphics.html',
    tags: ['graphics', 'engine', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  },
  {
    title: 'Assets',
    description: 'Explore examples featuring the asset management system.',
    image: 'placeholder-image.jpg',
    url: 'assets.html',
    tags: ['assets', 'management', 'loading', 'resources', 'files', 'images', 'audio', 'video', 'fonts', 'scripts', 'data']
  },
  {
    title: 'Plugins',
    description: 'Explore examples featuring the plugin system.',
    image: 'placeholder-image.jpg',
    url: 'plugins.html',
    tags: ['plugins', 'system', 'modules', 'extensions', 'addons', 'features', 'components', 'interfaces', 'libraries', 'tools']
  },
  {
    title: 'Game Config',
    description: 'Explore examples featuring the game configuration.',
    image: 'placeholder-image.jpg',
    url: 'game-config.html',
    tags: ['game', 'config', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Items',
    description: 'Explore examples featuring the item system.',
    image: 'placeholder-image.jpg',
    url: 'items.html',
    tags: ['items', 'system', 'inventory', 'equipment', 'consumables', 'loot', 'rewards', 'currencies', 'trading', 'crafting']
  },
  {
    title: 'Entity',
    description: 'Explore examples featuring the entity system.',
    image: 'placeholder-image.jpg',
    url: 'entity.html',
    tags: ['entity', 'system', 'components', 'entities', 'objects', 'instances', 'prefabs', 'instances', 'instances', 'instances']
  }
];

let examples = [
  {
    title: 'Block',
    category: 'items',
    description: 'Create a block item and add it to the inventory.',
    image: 'placeholder-image.jpg',
    url: 'items/block.html',
    tags: ['block', 'item', 'inventory', 'building', 'construction', 'material', 'structure', 'obstacle', 'barrier', 'wall', 'floor']
  },
  {
    title: 'Bomb',
    category: 'items',
    description: 'Create a bomb item and add it to the inventory.',
    image: 'placeholder-image.jpg',
    url: 'items/bomb.html',
    tags: ['bomb', 'item', 'inventory', 'explosive', 'damage', 'area', 'effect', 'blast', 'radius', 'timer', 'fuse']
  },
  {
    title: 'Bullet',
    category: 'items',
    description: 'Create a bullet item and add it to the inventory.',
    image: 'placeholder-image.jpg',
    url: 'items/bullet.html',
    tags: ['bullet', 'item', 'inventory', 'projectile', 'damage', 'range', 'speed', 'accuracy', 'penetration', 'piercing', 'shooting']
  },
  {
    title: 'Boomerang',
    category: 'items',
    description: 'Create a boomerang item and add it to the inventory.',
    image: 'placeholder-image.jpg',
    url: 'items/boomerang.html',
    tags: ['boomerang', 'item', 'inventory', 'throwing', 'damage', 'return', 'range', 'speed', 'accuracy', 'penetration', 'piercing']
  },
  {
    title: 'Create Entity',
    category: 'entity',
    description: 'Create a new entity and add it to the scene.',
    image: 'placeholder-image.jpg',
    url: 'entity/create-entity.html',
    tags: ['create', 'entity', 'scene', 'add', 'new', 'instance', 'object', 'prefab', 'clone', 'copy', 'duplicate']
  },
  {
    title: 'Remove Entity',
    category: 'entity',
    description: 'Remove an entity from the scene.',
    image: 'placeholder-image.jpg',
    url: 'entity/remove-entity.html',
    tags: ['remove', 'entity', 'scene', 'delete', 'destroy', 'dispose', 'clear', 'purge', 'eliminate', 'exterminate']
  },
  {
    title: 'Update Entity',
    category: 'entity',
    description: 'Update an entity in the scene.',
    image: 'placeholder-image.jpg',
    url: 'entity/update-entity.html',
    tags: ['update', 'entity', 'scene', 'modify', 'change', 'edit', 'adjust', 'transform', 'position', 'rotation', 'scale']
  },
  {
    title: 'Apply Force',
    category: 'physics',
    description: 'Apply a force to an entity.',
    image: 'placeholder-image.jpg',
    url: 'physics/apply-force.html',
    tags: ['apply', 'force', 'entity', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  },
  {
    title: 'Set Position',
    category: 'physics',
    description: 'Set the position of an entity.',
    image: 'placeholder-image.jpg',
    url: 'physics/set-position.html',
    tags: ['set', 'position', 'entity', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  },
  {
    title: 'Rotate',
    category: 'physics',
    description: 'Rotate an entity.',
    image: 'placeholder-image.jpg',
    url: 'physics/rotate.html',
    tags: ['rotate', 'entity', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  }
];

// TODO: we need to add an event handler for all lazy loaded exampleLink
// such that when the link is clicked we load the iframe based on the url and return false to prevent the default action
// the iframe is already in the document and looks like this:
/*
  <div class="exampleEmbeds">
    <iframe id="example-embed" src="./items/bullet.html" frameborder="0" width="100%" height="100%"></iframe>
  </div>

  When the example iframe loads we'll need to hide .categories and show .exampleEmbeds

*/

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const categoriesContainer = document.querySelector('.categories');
  const exampleEmbedsContainer = document.querySelector('.exampleEmbeds');
  const exampleIframe = document.getElementById('example-embed');
  const codeEditor = document.querySelector('.code-editor'); // Assuming there's a code editor element with class 'code-editor'

  searchInput.addEventListener('input', handleSearch);

  function handleSearch() {
    const keyword = searchInput.value.toLowerCase();
    const filteredCategories = filterCategories(keyword);
    const filteredExamples = filterExamples(keyword);

    // Set embed src to empty string and hide
    exampleIframe.src = '';
    exampleEmbedsContainer.style.display = 'none';

    // Hide the code editor
    codeEditor.style.display = 'none';

    // show categories again
    categoriesContainer.style.display = 'flex';

    updateCategoriesDisplay(filteredCategories);
    updateExamplesDisplay(filteredExamples);
  }

  function filterCategories(keyword) {
    return categories.filter(category =>
      category.title.toLowerCase().includes(keyword) ||
      category.description.toLowerCase().includes(keyword) ||
      category.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
  }

  function filterExamples(keyword, categoryFilter = null) {
    return examples.filter(example =>
      (!categoryFilter || example.category.toLowerCase() === categoryFilter.toLowerCase()) &&
      (keyword === '' || example.title.toLowerCase().includes(keyword) ||
        example.description.toLowerCase().includes(keyword) ||
        example.tags.some(tag => tag.toLowerCase().includes(keyword)))
    );
  }


  function updateCategoriesDisplay(filteredCategories) {
    categoriesContainer.innerHTML = ''; // Clear the current content

    filteredCategories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.className = 'category';
      categoryElement.innerHTML = `
        <img src="${category.image}" alt="${category.title}">
        <h3>${category.title}</h3>
        <p>${category.description}</p>
        <button class="view-category">View Category</button>
      `;

      // get all .category elements
      categoryElement.addEventListener('click', () => {
        const categoryTitle = category.title; // Get the title of the clicked category
        console.log("categoryTitle", categoryTitle)

        // update url push state
        window.history.pushState({}, categoryTitle, `/${categoryTitle}`);

        const categoryExamples = filterExamples('', categoryTitle); // Filter examples for this category
        console.log("categoryExamples", categoryExamples)
        categoriesContainer.innerHTML = ''; // Clear the current content to display only the relevant examples
        updateExamplesDisplay(categoryExamples); // Update the display with the filtered examples
      });


      categoriesContainer.appendChild(categoryElement);
    });
  }

  function updateExamplesDisplay(filteredExamples) {
    // Optionally clear the categories display or do something else as per requirement
    // categoriesContainer.innerHTML = '';
    console.log('filteredExamples', filteredExamples)
    filteredExamples.forEach(example => {
      const exampleElement = document.createElement('div');
      exampleElement.className = 'category'; // Consider renaming the class for semantic clarity
      exampleElement.innerHTML = `
        <img src="${example.image}" alt="${example.title}">
        <h3>${example.title}</h3>
        <p>${example.description}</p>
        <a class="exampleLink" href="${example.url}">View Example</a>
      `;

      categoriesContainer.appendChild(exampleElement);
    });


    // Add event listeners to example links for lazy loading in iframe
    const exampleLinks = document.querySelectorAll('.exampleLink');
    exampleLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link behavior
        const exampleUrl = link.getAttribute('href'); // Get the URL from the link
        exampleIframe.src = exampleUrl; // Set the iframe src to load the example

        categoriesContainer.style.display = 'none'; // Hide the categories container
        exampleEmbedsContainer.style.display = 'block'; // Show the example iframe container

        loadEditor(exampleUrl);

      });
    });

  }

  updateCategoriesDisplay(categories);

});



let editor;
let loaded = false;

function loadEditor(exampleUrl) {

  if (loaded) return;

  loaded = true;
  let exampleName = 'items/bullet';
  exampleName = exampleUrl.replace('.html', '');

  fetchAndDisplayCode();
  function fetchAndDisplayCode() {
    fetch('./' + exampleName + '.js')
      .then(response => response.text())
      .then(code => {

        // inject the code into the script tag
        /*
        const script = document.createElement('script');
        script.textContent = code;
        document.body.appendChild(script);
        */

        // trigger DOMContentLoaded event to run the code
        // Warning: This may cause infinite loops if mutex is not used on demos page all events subscribed to DOMContentLoaded
        //document.dispatchEvent(new Event('DOMContentLoaded'));
        // Append the mantra.js script to the start of the string.
        //code = '<script src="mantra.js"><\/script>\n' + code;


        // Remove the very last line of the code example.
        code = code.trim().split('\n').slice(0, -1).join('\n');
        code = code.trim().split('\n').slice(0, -1).join('\n');

        // Set the code example to the pre element
        document.querySelector('.code-editor pre').textContent = code;
        // hide the code example
        // document.querySelector('.code-editor').style.display = 'none';
        // editor.setValue(code);

        // set the iframe src to bullet.html, sibling to this file
        document.querySelector('#example-embed').src = './' + exampleName + '.html';

        // show code-editor
        // this no good?
        document.querySelector('.code-editor').style.display = 'block';


      })
      .catch(error => {
        throw error;
        console.error('Error fetching the code example:', error);
      });
  }

}
