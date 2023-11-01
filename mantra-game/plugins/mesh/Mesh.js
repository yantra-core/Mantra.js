// TODO: the BABYLON dependency should be injected into this class or just delegated or something
// lets do this without having to use Extend keyword?


export default class MeshPlugin {
  constructor() {
    this.name = 'MeshPlugin';
  }

  init(game) {
    //    this.scene = game.graphics.scene;
    this.game = game;
    game.systemsManager.addSystem('mesh', this);
  }

  createMesh(entityData) {
    switch (entityData.type) {
      case 'PLAYER':
        return this.createPlayerMesh(entityData);
      case 'BULLET':
        return this.createBulletMesh(entityData);
      default:
        return this.createDefaultMesh(entityData);
    }
  }

  removeMesh(entityId) {
    let entity = this.game.getEntity(entityId);
    if (entity && entity.mesh) {
      entity.mesh.dispose();
    }
  }

  createDefaultMesh(entityData) {
    // create a box as default
    let box = this.createBoxMesh(entityData);
    return box;
  }

  createBoxMesh (entityData) {
    // TODO: remove references to BABYLON
    let box = BABYLON.MeshBuilder.CreateBox('default', { width: entityData.width, height: 100, depth: entityData.height }, this.scene);
    box.position = new BABYLON.Vector3(entityData.position.x, 1, entityData.position.y);
    return box;
  }

  createPlayerMesh(entityData) {

    // TODO: this needs to return an array of graphics, each bounds to the correct graphic scope
    let graphic = this.game.createGraphic({
      type: 'triangle',
      config: entityData
    });

    return graphic;
  }

  createBulletMesh(entityData) {
    let sphere = this.createSphereMesh(entityData);
    // reposition the sphere to the center of the bullet
    sphere.position.z = entityData.position.y;
    sphere.position.x = entityData.position.x;
    return sphere;
  }

  createCylinderMesh(entityData) {
    return BABYLON.MeshBuilder.CreateCylinder(entityData.id, {
      diameterTop: 0,
      diameterBottom: 100,
      height: 100,
      tessellation: 3
    }, this.scene);
  }

  createSphereMesh(entityData) {
    return BABYLON.MeshBuilder.CreateSphere('bullet', { diameter: entityData.radius * 2 }, this.scene);
  }

  updateMesh(entityData) {
    let previousEntity = this.game.getEntity(entityData.id);
    if (!previousEntity || !previousEntity.mesh) {
      return;
    }

    // TODO: this needs to call into the meshFactory, no direct calls to babylon here!
    previousEntity.mesh.position = new BABYLON.Vector3(entityData.position.x, 1, entityData.position.y);
    if (entityData.rotation !== undefined) {
      previousEntity.mesh.rotation.y = -entityData.rotation;
      // in additon, adjust by -Math.PI / 2;
      previousEntity.mesh.rotation.y = -entityData.rotation - Math.PI / 2;
    }
  }

}