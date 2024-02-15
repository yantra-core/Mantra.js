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


let ogPath = window.location.pathname;
// TODO: decouple main fn from DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {


  // only render if root page
  //if (window.location.pathname !== '/') return;

  const searchInput = document.getElementById('searchInput');
  const categoriesContainer = document.querySelector('.categories');
  const exampleEmbedsContainer = document.querySelector('.exampleEmbeds');
  const exampleIframe = document.getElementById('example-embed');
  const codeEditor = document.querySelector('.code-editor'); // Assuming there's a code editor element with class 'code-editor'


  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // set the default push state to the root
  // Preserve the original state and remove 'index.html' from the path if it exists
  let initialPath = window.location.pathname;


  function handleSearch() {
    const keyword = searchInput.value.toLowerCase();
    const filteredCategories = filterCategories(keyword);
    const filteredExamples = filterExamples(keyword);

    // Set embed src to empty string and hide
    // exampleIframe.src = '';
    // exampleEmbedsContainer.style.display = 'none';

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
    return examples.filter(example => {
      const exampleCategories = Array.isArray(example.category) ? example.category : [example.category];
      return (!categoryFilter || exampleCategories.map(cat => cat.toLowerCase()).includes(categoryFilter.toLowerCase())) &&
        (keyword === '' || example.title.toLowerCase().includes(keyword) ||
          example.description.toLowerCase().includes(keyword) ||
          example.tags.some(tag => tag.toLowerCase().includes(keyword)));
    });
  }


  function updateCategoriesDisplay(filteredCategories) {
    categoriesContainer.innerHTML = ''; // Clear the current content

    filteredCategories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.className = 'category';
      //         <img class="categoryImage" src="${category.image}" alt="${category.title}">
      categoryElement.innerHTML = `
        <span class="categoryImage">${category.title}</span>
        <p>${category.description}</p>
        <h3>${category.title}</h3>
      `;
      //         <button class="view-category">View Category</button>

      console.log('category', category)
      // set the categoryElement background color to the category color
      categoryElement.style.backgroundColor = category.color;

      // get all .category elements
      categoryElement.addEventListener('click', () => {
        const categoryTitle = category.title; // Get the title of the clicked category
        let categoryName = category.name;
        // console.log("categoryTitle", categoryTitle)

        // update url push state
        let newPath = `${window.location.pathname}${category.url.replace('.html', '')}`;
        window.history.pushState({ type: 'category', title: category.title }, categoryTitle, newPath);
        //let categoryPath = category.url.replace('.html', '');
        //window.history.pushState({ type: 'category', title: category.title }, categoryPath, `/${categoryPath}`);

        const categoryExamples = filterExamples('', categoryName); // Filter examples for this category
        // console.log("categoryExamples", categoryExamples)
        categoriesContainer.innerHTML = ''; // Clear the current content to display only the relevant examples
        updateExamplesDisplay(categoryExamples); // Update the display with the filtered examples
      });
      categoriesContainer.appendChild(categoryElement);
    });
  }

  function updateExamplesDisplay(filteredExamples) {
    categoriesContainer.innerHTML = ''; // Clear the categories display
    filteredExamples.forEach(example => {
      const exampleElement = document.createElement('div');
      exampleElement.className = 'category'; // Consider renaming for clarity

      // Handle example categories for display
      const exampleCategoryNames = Array.isArray(example.category) ? example.category.join(', ') : example.category;
      exampleElement.innerHTML = `
                  <span class="categoryExample">${exampleCategoryNames}</span>
                  <p>${example.description}</p>
                  <h3>${example.title}</h3>
              `;

      // Determine the category to use for the background color
      let categoryName = Array.isArray(example.category) ? example.category[0] : example.category;
      let category = categories.find(cat => cat.name === categoryName);

      console.log("category", category);
      console.log('example', example);
      exampleElement.style.backgroundColor = category ? category.color : 'defaultColor'; // Use a default color if category is not found

      categoriesContainer.appendChild(exampleElement);

      exampleElement.addEventListener('click', () => {
        example.url = example.url;
        loadExampleEmbed(example); // Load the example iframe
      });
    });
  }



  function loadExampleEmbed(example) {
    // console.log("loadExampleEmbed", example)
    let exampleUrl = '' + example.url; // Get the URL of the clicked example

    // if not runnnig port 8888 dev mode, remove .html from url
    if (window.location.port !== '8889') {
      exampleUrl = exampleUrl.replace('.html', '');
    }
    window.location = exampleUrl;
  }

  // if root, load default ats
  // TODO manually copy static html for root index.html with top level categories
  if (window.location.pathname === '/') {
    updateCategoriesDisplay(categories);
  }
  // updateCategoriesDisplay(categories);

  // add popstate event listener
  window.addEventListener('popstate', function (event) {
    // on pop state, reload categories
    // this is intended to capture the back button to prevent empty categories list
    updateCategoriesDisplay(categories);
  });

});