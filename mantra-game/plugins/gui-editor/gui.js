// gui.js - Marak Squires 2023
const gui = {
  window: function (id, title = 'Window', close) {

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

    // Create a draggable header
    const dragHeader = document.createElement('div');
    dragHeader.className = 'dragHeader';

    // create h3 for title
    const dragHeaderTitle = document.createElement('h3');
    dragHeaderTitle.textContent = title;
    dragHeader.appendChild(dragHeaderTitle);
    container.appendChild(dragHeader);

    // Add close button
    const closeButton = document.createElement('span');
    closeButton.className = 'closeButton';
    closeButton.textContent = 'X';
    closeButton.onclick = () => close();
    dragHeader.appendChild(closeButton);

    // Add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resizeHandle';
    container.appendChild(resizeHandle);

    // Append the container to the document body
    document.body.appendChild(container);

    // Initialize dragging and resizing
    this.initializeDrag(dragHeader, container);
    this.initializeResize(resizeHandle, container);

    // Add event listener for click to manage z-index
    container.addEventListener('click', function() {
      // Bring the clicked container to the front
      gui.bringToFront(container);
    });

    return container;
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

export default gui;
