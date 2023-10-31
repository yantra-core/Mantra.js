// TODO: the BABYLON dependency should be injected into this class or just delegated or something
// lets do this without having to use Extend keyword?


export default class MeshFactory {
  constructor(scene) {
    this.scene = scene;
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

  createDefaultMesh(entityData) {
    // create a box as default
    let box = this.createBoxMesh(entityData);
    return box;
  }

  createBoxMesh (entityData) {
    //return BABYLON.MeshBuilder.CreateBox('default', { width: entityData.width, height: entityData.height }, this.scene);
  }

  createPlayerMesh(entityData) {
    let mesh = this.createCylinderMesh(entityData);
    //mesh.rotation.z = Math.PI / 2;
    //mesh.rotation.y = -Math.PI / 2;
    return mesh;
  }

  createBulletMesh(entityData) {
    let sphere = this.createSphereMesh(entityData);
    // reposition the sphere to the center of the bullet
    sphere.y = entityData.position.y;
    sphere.x = entityData.position.x + 300;
    return sphere;
  }

  createCylinderMesh(entityData) {
    console.log('make player mesh', entityData);
    // create a phaser sprite on scene
    //console.log('tttt', this.scene)
    // let shipSprite = mainScene.add.sprite(thingy.x, thingy.y, 'hexapod', null);
    /*
    let sprite = this.scene.add.sprite(entityData.x, entityData.y, 'player');
    sprite.displayWidth = 100;
    sprite.displayHeight = 100;
    */

    let sprite = this.scene.add.graphics();
    sprite.fillStyle(0xff0000, 1);
    sprite.fillRect(500, 500, 100, 100);
    sprite.setDepth(10);
    console.log('entityData.x', entityData.position)
    sprite.x = entityData.position.x + 300;
    //sprite.y = entityData.position.y - 400;

    /*
    */
    // create red geo box in phaser
    /*
    console.log("MAKING THE THING", entityData)
    */

    return sprite;
    /*
    return BABYLON.MeshBuilder.CreateCylinder(entityData.id, {
      diameterTop: 0,
      diameterBottom: 100,
      height: 100,
      tessellation: 3
    }, this.scene);
    */
  }

  createSphereMesh(entityData) {
    let sprite = this.scene.add.graphics();
    sprite.fillStyle(0xff0000, 1);
    sprite.fillRect(500, 500, 100, 100);
    sprite.setDepth(10);
    console.log('entityData.x', entityData.position)
    sprite.x = entityData.position.x + 300;
    return sprite;
    //return BABYLON.MeshBuilder.CreateSphere('bullet', { diameter: entityData.radius * 2 }, this.scene);
  }

}