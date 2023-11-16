let gameTick = 0;

class BabylonStarField {
  constructor(starCount = 5000, fieldSize = 10000) {
    this.starCount = starCount;
    this.fieldSize = fieldSize;
    this.particles = [];
    this.name = 'starfield';

  }

  init (game, engine, scene) {
    this.scene = scene;
    this.camera = scene.cameras[0];
    this.initialize(); // TODO: rename
  }

  initialize() {
    var pcs = new BABYLON.PointsCloudSystem("pcs", 1, this.scene);
    this.pcs = pcs;

    pcs.addPoints(this.starCount, (particle, i) => {
      particle.position.x = Math.random() * this.fieldSize - this.fieldSize / 2;
      particle.position.y = Math.random() * this.fieldSize - this.fieldSize / 2;
      particle.position.z = Math.random() * this.fieldSize - this.fieldSize / 2;
    });

    pcs.buildMeshAsync().then(() => {
      this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
    });

    this.particles = pcs.particles;

    this.scene.registerBeforeRender(() => this.updateStars());
  }

  updateStars() {

    if (!this.camera) {
      // if there is no camera, do not move the stars
      console.log('this.camera was not found in StarField.updateStars, returning early')
      return;
    }
    const halfFieldSize = this.fieldSize / 2;
    
    this.pcs.updateParticle = (particle) => {
      ['x', 'y', 'z'].forEach(axis => {
        if (particle.position[axis] - this.camera.position[axis] > halfFieldSize) {
          // Particle has exited positive side, reposition on negative side with buffer
          particle.position[axis] -= this.fieldSize - 10; // 10 units buffer to avoid sudden gaps
        } else if (particle.position[axis] - this.camera.position[axis] < -halfFieldSize) {
          // Particle has exited negative side, reposition on positive side with buffer
          particle.position[axis] += this.fieldSize - 10; // 10 units buffer to avoid sudden gaps
        }
      });
      return true; // Return true to update the particle in the system
    };

    this.pcs.setParticles();
  }

}

export default BabylonStarField;
