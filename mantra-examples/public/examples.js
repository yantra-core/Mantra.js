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
  window.history.pushState({}, 'Mantra Examples', '/');

  window.addEventListener('popstate', function (event) {
    // Always clear the iframe and hide it
    exampleIframe.src = '';
    exampleEmbedsContainer.style.display = 'none';
  
    // Hide the code editor and clear it
    codeEditor.style.display = 'none';
    document.querySelector('.code-editor pre').textContent = '';
  
    // Always show the search container
    document.querySelector('.search-container').style.display = 'block';

    let path = window.location.pathname;

    if (path === '/') {
      categoriesContainer.innerHTML = ''; // It's important to clear the content to reset the view
      updateCategoriesDisplay(categories);
      return;
    }

    if (event.state) {
      const { type, title } = event.state;
      if (type === 'category') {
        // Display examples for this category
        const categoryExamples = filterExamples('', title);
        categoriesContainer.innerHTML = ''; // Clear the current content
        updateExamplesDisplay(categoryExamples);
      } else if (type === 'example') {
        // Load the example embed
        loadExampleEmbed({ title, url: event.state.url });
      }
    } else {
      // No state or root state, revert to initial categories display
      categoriesContainer.innerHTML = ''; // It's important to clear the content to reset the view
      updateCategoriesDisplay(categories);
    }
  
    // Always show categories container, but conditionally based on whether it's already populated
    if (!categoriesContainer.innerHTML.trim()) {
      updateCategoriesDisplay(categories);
    }
    categoriesContainer.style.display = 'flex'; // Show categories container
    exampleEmbedsContainer.style.display = 'none'; // Ensure example iframe container is hidden
  });
  

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

    // hide the example-embed
    // Remark: might not be needed, check pushState
    document.querySelector('#example-embed').style.display = 'none';
    // TODO: set src to empty?

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
      //         <img class="categoryImage" src="${category.image}" alt="${category.title}">
      categoryElement.innerHTML = `
        <span class="categoryImage">${category.title}</span>
        <p>${category.description}</p>
        <h3>${category.title}</h3>
      `;
      //         <button class="view-category">View Category</button>

      // set the categoryElement background color to the category color
      categoryElement.style.backgroundColor = category.color;

      // get all .category elements
      categoryElement.addEventListener('click', () => {
        const categoryTitle = category.title; // Get the title of the clicked category
        console.log("categoryTitle", categoryTitle)

        // update url push state
        let categoryPath = category.url.replace('.html', '');
        window.history.pushState({ type: 'category', title: category.title }, categoryPath, `/${categoryPath}`);
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
    categoriesContainer.innerHTML = '';
    console.log('filteredExamples', filteredExamples)
    filteredExamples.forEach(example => {
      const exampleElement = document.createElement('div');
      exampleElement.className = 'category'; // Consider renaming the class for semantic clarity
      //         <img src="${example.image}" alt="${example.title}">
      exampleElement.innerHTML = `
        <span class="categoryExample">${example.category}</span>
        <p>${example.description}</p>
        <h3>${example.title}</h3>
      `;

      //         <a class="exampleLink" href="${example.url}">View Example</a>

      // assign the categoryExample background color to the category color
      const category = categories.find(category => category.title.toLowerCase() === example.category.toLowerCase());
      exampleElement.style.backgroundColor = category.color;
      categoriesContainer.appendChild(exampleElement);

      exampleElement.addEventListener('click', () => {
        
        // Use the category's title to prepend to the example's title in the URL
        const stateUrl = `${example.url.replace('.html', '')}`;
        window.history.pushState({ type: 'example', title: example.title, url: example.url }, example.title, stateUrl);
        loadExampleEmbed(example); // Load the example iframe
      });

    });

  }

  function loadExampleEmbed (example) {
    console.log("loadExampleEmbed", example)
    const exampleUrl = '/' + example.url; // Get the URL of the clicked example
    exampleIframe.src = exampleUrl;
    exampleIframe.style.display = 'block';
    categoriesContainer.style.display = 'none'; // Hide the categories container
    exampleEmbedsContainer.style.display = 'block'; // Show the example iframe container
    loadEditor(example);
  }
  
  updateCategoriesDisplay(categories);

});

let editor;
let loaded = false;

function loadEditor(example) {
  if (loaded) return;

  loaded = true;
  let exampleUrl = example.url;
  let exampleName = 'items/bullet';
  exampleName = exampleUrl.replace('.html', '');
  // set push state to the example name
  // window.history.pushState({}, exampleName, `/${exampleName}`);
  let jsSource = '/' + exampleName + '.js';
  console.log('loading remote source', jsSource)
  fetchAndDisplayCode();
  function fetchAndDisplayCode() {
    fetch(jsSource)
      .then(response => response.text())
      .then(code => {
        console.log(code)
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


        // check to see if code-editor exists in DOM, if not create it
        if (!document.querySelector('.code-editor')) {
          const codeEditor = document.createElement('div');
          codeEditor.className = 'code-editor';
          codeEditor.innerHTML = `
            <pre>Loading code from document...</pre>
            <div class="resize-handle"></div> <!-- Resize handle -->
          `;


          /*
           .code-editor {
            position: relative;
            width: 100%;
            height: 30vh;
            background: #333;
            color: #fff;
            overflow: auto;
            padding: 20px;
            box-sizing: border-box;
            font-family: monospace;
            resize: vertical;
            border: 1px solid #888;
            display: none;
          }
          */
          // set the styles
          codeEditor.style.position = 'relative';
          codeEditor.style.width = '100%';

          codeEditor.style.height = '30vh';
          codeEditor.style.background = '#333';
          codeEditor.style.color = '#fff';
          codeEditor.style.overflow = 'auto';
          codeEditor.style.padding = '20px';
          codeEditor.style.boxSizing = 'border-box';
          codeEditor.style.fontFamily = 'monospace';
          codeEditor.style.resize = 'vertical';
          codeEditor.style.border = '1px solid #888';
          

          document.body.appendChild(codeEditor);
        }

        // Set the code example to the pre element
        document.querySelector('.code-editor pre').textContent = code;
        // hide the code example
        // document.querySelector('.code-editor').style.display = 'none';
        // editor.setValue(code);

        // set the iframe src to bullet.html, sibling to this file
        // document.querySelector('#example-embed').src = './' + exampleName + '.html';

        // hide the search-container class
        // check that the search-container exists
        if (document.querySelector('.search-container')) {
          document.querySelector('.search-container').style.display = 'none';
        }

        // show code-editor
        document.querySelector('.code-editor').style.display = 'block';

      })
      .catch(error => {
        throw error;
        console.error('Error fetching the code example:', error);
      });
  }

}
