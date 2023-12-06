//import lightTheme from "./themes/light.js";
//import darkTheme from "./themes/dark.js";
// gui.js - Marak Squires 2023
const gui = {
  /*
  setTheme: function (name) {
    if (name === 'light') {
      this.theme(lightTheme);
    } else if (name === 'dark') {
      this.theme(darkTheme);
    } else {
      console.log(`Theme ${name} not found, defaulting to light theme`);
      this.theme(lightTheme);
    }
  },
  theme: function (theme) {
    // theme is an object gui-elements and cssObjects
    // for each gui element type in the theme
    // find *all* nodes that match the type
    // iterate over each node and apply the cssObject
    console.log('setting theme', theme)
    for (let type in theme) {
      let cssObject = theme[type];
      let nodes = document.querySelectorAll(`.${type}`);
      console.log('ffff', nodes)
      nodes.forEach(node => {
        this.skin(node, cssObject);
      });
    }
  },
  skin: function(guiElement, cssObject) {
    // guiElement is a DOM element
    // cssObject is an object with css properties
    for (let property in cssObject) {
      // update the live node style
      guiElement.style[property] = cssObject[property];
      // update the style sheet for all future nodes
      // this will override any inline styles
      let styleSheet = document.styleSheets[0];
      let selector = `.${guiElement.className}`;
      let rule = `${property}: ${cssObject[property]}`;
      let index = styleSheet.cssRules.length;
      styleSheet.insertRule(`${selector} { ${rule} }`, index);

    }
  },
  */
  elementList: ['gui-container', 'gui-content', 'gui-header', 'gui-header-title', 'traffic-light', 'close', 'minimize', 'maximize', 'resizeHandle', 'gui-window-footer'],
  window: function (id, title = 'Window', close, pluginInstance = null) {
    let self = this;
    if (typeof close === 'undefined') {
      close = function () {
        console.log("WARNING: No close function provided for window with id: " + id + ", defaulting to remove()");
        document.getElementById(id).remove();
      };
    }
    // Create container
    const container = document.createElement('div');
    container.id = id;
    container.className = 'gui-container';


    // Create the content of the container
    const content = document.createElement('div');
    content.className = 'gui-content';

    // Create a draggable header
    const guiHeader = document.createElement('div');
    guiHeader.className = 'gui-header';


    // create a utility gear icon in header that will call game.systems['gui-plugin-explorer'].drawPluginForm(pluginName)
    if (false && pluginInstance) {
      const gearIcon = document.createElement('i');
      gearIcon.className = 'fas fa-cog';
      gearIcon.style.float = 'right';
      gearIcon.style.cursor = 'pointer';
      gearIcon.style.top = '20px';
      gearIcon.style.right = '20px';
      gearIcon.style.fontSize = '50px';
      gearIcon.innerHTML = "FFF";
      gearIcon.onclick = () => {
        console.log(pluginInstance)
        game.systems['gui-plugin-explorer'].drawPluginForm(pluginInstance, game._plugins[pluginInstance.id]);
      };
      guiHeader.appendChild(gearIcon);
    }

    // Traffic light container
    let trafficLightContainer = document.createElement('div');
    trafficLightContainer.className = 'traffic-light-container';

    // Add traffic light buttons
    const closeButton = document.createElement('div');
    const minimizeButton = document.createElement('div');
    const maximizeButton = document.createElement('div');

    closeButton.className = 'traffic-light close';
    minimizeButton.className = 'traffic-light minimize';
    maximizeButton.className = 'traffic-light maximize';
    minimizeButton.onclick = () => close();
    closeButton.onclick = () => close();
    maximizeButton.onclick = () => {
      self.maxWindow(container);
    };

    trafficLightContainer.appendChild(closeButton);
    trafficLightContainer.appendChild(minimizeButton);
    trafficLightContainer.appendChild(maximizeButton);

    guiHeader.appendChild(trafficLightContainer);

    // create h3 for title
    const guiHeaderTitle = document.createElement('h3');
    guiHeaderTitle.textContent = title;

    // add "double click" event to h3 to maximize window
    guiHeaderTitle.ondblclick = () => {
      self.maxWindow(container);
    };

    guiHeader.appendChild(guiHeaderTitle);
    container.appendChild(guiHeader);
    container.appendChild(content);

    // Add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resizeHandle';
    container.appendChild(resizeHandle);

    // Append the container to the document body
    document.body.appendChild(container);

    // Initialize dragging and resizing
    this.initializeDrag(guiHeader, container);
    this.initializeResize(resizeHandle, container);

    // Add event listener for click to manage z-index
    container.addEventListener('click', function () {
      // Bring the clicked container to the front
      gui.bringToFront(container);
    });

    return container;
  },

  maxWindow(container) {
    if (container.style.width === '100vw') {
      container.style.width = '50%';
      container.style.height = '50%';
      // set position to center

      if (typeof container.lastTop !== 'undefined') {
        container.style.top = container.lastTop;
        container.style.left = container.lastLeft;
      } else {
        container.style.top = '20%';
        container.style.left = '20%';
      }

    } else {

      // store the exact last position on container itself
      // use special property
      container.lastTop = container.style.top;
      container.lastLeft = container.style.left;

      container.style.width = '100vw';
      container.style.height = '90%';
      // set position to top left
      container.style.top = '50px';
      container.style.left = '0px';
    }

  },
  initializeResize(resizeHandle, container) {
    resizeHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      gui.bringToFront(container);
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });

    const resize = (e) => {
      // Set new width and height of the container
      this.container.style.width = e.clientX - this.container.offsetLeft + 'px';
      this.container.style.height = e.clientY - this.container.offsetTop + 'px';
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', resize);
    };
  },

  initializeDrag(dragElement, container) {
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

    dragElement.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      gui.bringToFront(container);
      // Get the mouse cursor position at startup
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      offsetX = mouseX - e.clientX;
      offsetY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Set the element's new position
      dragElement.parentElement.style.top = (dragElement.parentElement.offsetTop - offsetY) + "px";
      dragElement.parentElement.style.left = (dragElement.parentElement.offsetLeft - offsetX) + "px";
    }

    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },

  bringToFront(clickedContainer) {
    // Get all gui-containers
    const containers = document.querySelectorAll('.gui-container');

    // Set z-index of all containers to 1
    containers.forEach(container => {
      container.style.zIndex = '1';
    });

    // Set z-index of the clicked container to 10
    clickedContainer.style.zIndex = '10';
  }

};

gui.init = function (game) {

  if (typeof document === 'undefined') {
    console.log('gui-plugin: document not found, skipping initialization');
    return;
  }
  // add a global click handler to document that will delegate any clicks
  // that are not inside gui-windows to re-enable inputs
  document.addEventListener('click', (e) => {
    // check if the click was inside a gui-window
    let guiWindow = e.target.closest('.gui-container');
    if (game && game.systems && game.systems['entity-input'] && game.systems['keyboard']) {
      if (!guiWindow) {
        // re-enable inputs
        game.systems['entity-input'].setInputsActive();
        game.systems['keyboard'].bindInputControls();
      } else {
        // disable inputs
        game.systems['entity-input'].disableInputs();
        game.systems['keyboard'].unbindAllEvents();
      }
    }
  });

  // bind the ESC key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      // get all gui-containers
      const containers = document.querySelectorAll('.gui-container');

      // TODO: unload the plugin instead of removing the container
      // remove the last one
      let lastContainer = containers[containers.length - 1];
      if (lastContainer) {
        lastContainer.remove();
      }
    }
  });

}




export default gui;
