    // Custom controls
    let canvas = document.getElementById('renderCanvas');
    let lastPointerX, lastPointerY;
    const sensitivity = 0.005; // Adjust this value based on your needs

    canvas.addEventListener("pointerdown", (evt) => {
      if (evt.button === 2) { // Right mouse button
        this.isDragging = true;
        lastPointerX = evt.clientX;
        lastPointerY = evt.clientY;
      }
    }, false);

    canvas.addEventListener("pointerup", (evt) => {
      if (evt.button === 2) {
        this.isDragging = false;
      }
    }, false);

    canvas.addEventListener("pointermove", (evt) => {
      if (this.isDragging) {
        let deltaX = evt.clientX - lastPointerX;
        let deltaY = evt.clientY - lastPointerY;
        lastPointerX = evt.clientX;
        lastPointerY = evt.clientY;

        // Adjust the camera's rotation angles based on the delta and sensitivity
        this.camera.alpha -= deltaX * sensitivity;
        this.camera.beta -= deltaY * sensitivity;
      }
    }, false);

    // Prevent the context menu on right-click
    canvas.oncontextmenu = function (evt) {
      evt.preventDefault();
    };

    // Disable left-click drag behavior
    canvas.addEventListener("pointerdown", (evt) => {
      if (evt.button === 0) { // Left mouse button
        evt.preventDefault();
      }
    }, false);


    // Adding back the mouse wheel event for zoom
    canvas.addEventListener("wheel", (evt) => {
      let zoomFactor = 2;
      this.camera.radius += evt.deltaY * zoomFactor;
      // Clamp the radius within the allowed limits
      this.camera.radius = Math.max(this.camera.lowerRadiusLimit, Math.min(this.camera.radius, this.camera.upperRadiusLimit));
    }, false);

    canvas.addEventListener("mousemove", (evt) => {
      let rect = canvas.getBoundingClientRect();
      let mouseX = evt.clientX - rect.left;
      let mouseY = evt.clientY - rect.top;

      // Now mouseX and mouseY are the coordinates relative to the canvas
      // Call a function to handle these coordinates
      this.handleMouseDirection(mouseX, mouseY);
    }, false);

