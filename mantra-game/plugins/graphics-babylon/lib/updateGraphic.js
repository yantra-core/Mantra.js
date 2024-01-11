export default function updateGraphic(entityData /*, alpha*/) {
  // console.log('setting position', entityData.position)
  let previousEntity = this.game.getEntity(entityData.id);
  if (!previousEntity || !previousEntity.graphics) {
    return;
  }

  let graphic = previousEntity.graphics['graphics-babylon'];

  if (typeof entityData.position === 'object') {
    // alpha value will be present if snapshot interpolation is enabled
    if (typeof alpha === 'number') {
      if (typeof previousEntity.position.z !== 'number') {
        previousEntity.position.z = 0;
      }
      if (typeof entityData.position.z !== 'number') {
        entityData.position.z = 0;
      }

      // Perform interpolation between the previous and current state
      let previousVector = new BABYLON.Vector3(previousEntity.position.x, previousEntity.position.y, previousEntity.position.z);
      let currentVector = new BABYLON.Vector3(entityData.position.x, entityData.position.y, entityData.position.z);
      const interpolatedPosition = BABYLON.Vector3.Lerp(previousVector, currentVector, alpha);
      // TODO: add rotation interpolation
      // const interpolatedRotation = BABYLON.Quaternion.Slerp(previousEntity.rotation, entityData.rotation, alpha);
      // console.log(-interpolatedPosition.x, interpolatedPosition.z, interpolatedPosition.y);
      // Update the entity's graphical representation with the interpolated state
      graphic.position = new BABYLON.Vector3(-interpolatedPosition.x, interpolatedPosition.z, interpolatedPosition.y);

    } else {
      //
      // Snapshot interpolation is not enabled, use exact position values from the snapshot
      //
      // console.log(-entityData.position.x, entityData.position.z, entityData.position.y);
      graphic.position = new BABYLON.Vector3(-entityData.position.x, entityData.position.z, entityData.position.y);
    }
  }

  if (typeof entityData.color === 'number') {

    if (!graphic.material) {
      graphic.material = new BABYLON.StandardMaterial("material", this.scene);
    }

    // console.log("setting color", entityData.color)
    // Extract RGB components from the hexadecimal color value
    var red = (entityData.color >> 16) & 255;
    var green = (entityData.color >> 8) & 255;
    var blue = entityData.color & 255;
    // Set tint of graphic using the extracted RGB values
    graphic.material.diffuseColor = new BABYLON.Color3.FromInts(red, green, blue);
    // console.log('updated graphic.diffuseColor', graphic.diffuseColor);

  }

  if (entityData.rotation !== undefined && entityData.rotation !== null) {
    //graphic.rotation.y = -entityData.rotation;
    // in additon, adjust by -Math.PI / 2;
    // adjust cylinder rotation shape to point "forward"
    // TODO: put in switch here for dimensions
    switch (this.game.physics.dimension) {
      case 2:
        // graphic.rotation.y = entityData.rotation + -Math.PI / 2;
        graphic.rotation = new BABYLON.Vector3(0, entityData.rotation, 0);
        break;
      case 3:
        if (typeof entityData.rotation !== 'object') {
          throw new Error('3D is activate but rotation is not an object. Did you make sure to use `physx` engine?');
        }
        const quaternion = new BABYLON.Quaternion(
          entityData.rotation.x,
          entityData.rotation.y,
          entityData.rotation.z,
          entityData.rotation.w
        );

        // Apply the quaternion rotation to the graphic
        graphic.rotationQuaternion = quaternion;
        break;
      default:
        throw new Error('Unknown physics dimensions, cannot update graphic')
        break;
    }
  }
}