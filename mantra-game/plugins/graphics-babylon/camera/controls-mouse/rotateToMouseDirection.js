handleMouseDirection(mouseX, mouseY) {
  let game = this.game;
  let player = this.game.getEntity(game.currentPlayerId);
  if (player && player.mesh) {
    let worldCoords = this.screenToWorld(mouseX, mouseY);
    let playerPos2D = new BABYLON.Vector3(player.mesh.position.x, 0, player.mesh.position.z);
    let mousePos2D = new BABYLON.Vector3(worldCoords.x, 0, worldCoords.z);

    // Calculate the direction vector on the 2D plane
    let direction2D = mousePos2D.subtract(playerPos2D).normalize();

    // Calculate the target rotation angle around the y-axis
    let targetAngle = Math.atan2(direction2D.z, direction2D.x);
    // If player's forward direction is along the positive Z-axis, you might need to adjust the angle calculation
    targetAngle = targetAngle + Math.PI; // Rotate by 180 degrees
    this.game.components.target.set(game.currentPlayerId, {
      angle: -targetAngle // Set the angle directly
    });
  }
}
updatePlayerRotation(deltaTime) {
  let game = this.game;
  let player = this.game.getEntity(game.currentPlayerId);
  if (player && player.mesh && player.target !== undefined) {
    // Smoothly interpolate the rotation
    let lerpFactor = 0.001; // Adjust this factor for smoother or quicker rotation
    player.mesh.rotation.y = BABYLON.Scalar.Lerp(player.mesh.rotation.y, player.target.angle, lerpFactor * deltaTime);

    // Check if the current rotation is close enough to the target rotation
    let angleDifference = Math.abs(player.mesh.rotation.y - player.target.angle);
    if (angleDifference > Math.PI) {
      angleDifference = 2 * Math.PI - angleDifference; // Correct for the angle wrap-around
    }

    const rotationThreshold = 0.05; // Define a small threshold for rotation difference (in radians)
    if (angleDifference > rotationThreshold) {
      let controls = this.directionToControls(player.target.angle);
      console.log(controls);
      this.game.communicationClient.sendMessage('player_input', { controls });
    } else {
      // If the rotation is within the threshold, you can assume the ship is facing the correct direction
      // and potentially reset the controls or handle as needed
      console.log("Rotation close enough, not updating controls");
    }
  }
}

screenToWorld(mouseX, mouseY) {
  let scene = this.scene;
  let engine = this.engine;

  // Get the picking ray from the camera to the mouse position
  let ray = scene.createPickingRay(mouseX, mouseY, BABYLON.Matrix.Identity(), this.camera);

  // Define a plane at y = 0 (or your ground plane's Y level)
  let groundPlane = new BABYLON.Plane(0, 1, 0, 0); // Plane equation ax + by + cz + d = 0

  // Calculate the distance from the ray origin to its intersection point with the plane
  let distance = ray.intersectsPlane(groundPlane);
  if (distance !== null) {
    // Calculate the intersection point using the distance
    return ray.origin.add(ray.direction.scale(distance));
  }

  return null; // or some default value in case there's no intersection
}


directionToControls(direction) {
  let controls = { A: false, D: false };

  // Normalize the angle to range 0 to 2π
  let normalizedAngle = (direction + 2 * Math.PI) % (2 * Math.PI);

  // Determine if the player should turn left or right
  // Since we're only concerned with rotation, we consider if the angle is in the left or right half of the circle
  if (normalizedAngle > 0 && normalizedAngle < Math.PI) {
    // Left half of the circle - Turn left (A)
    controls.D = true;
  } else if (normalizedAngle > Math.PI && normalizedAngle < 2 * Math.PI) {
    // Right half of the circle - Turn right (D)
    controls.A = true;
  }
  // Note: If normalizedAngle is exactly 0, Math.PI, or 2 * Math.PI, we can choose to do nothing as the player is aligned either directly left or right


  return controls;
}
