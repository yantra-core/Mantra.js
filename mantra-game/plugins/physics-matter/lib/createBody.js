// TODO: move this to PhysicsPlugin
export default function createBody(config) {

  let Matter = this.Matter;
  let game = this.game;

  let commonBodyConfig = {
    mass: config.mass,
    isSensor: config.isSensor,
    isStatic: config.isStatic,
    inertia: Infinity,
    density: config.density,
    restitution: config.restitution,
    friction: config.friction,
    frictionAir: config.frictionAir,
    frictionStatic: config.frictionStatic
  };

  if (config.type === "BULLET") {
    config.shape = 'circle';
  }

  let body;
  switch (config.shape) {
    case 'rectangle':
      body = this.game.physics.Bodies.rectangle(config.position.x, config.position.y, config.width, config.height, commonBodyConfig);
      break;
    case 'circle':
      body = this.game.physics.Bodies.circle(config.position.x, config.position.y, config.radius, commonBodyConfig);
      break;
    case 'triangle':
    default:
      const triangleVertices = [
        { x: config.position.x, y: config.position.y - 32 },
        { x: config.position.x - 32, y: config.position.y + 32 },
        { x: config.position.x + 32, y: config.position.y + 32 }
      ];
      // TODO: add this support to PhysxPlugin
      //body = this.game.physics.Bodies.fromVertices(config.position.x, config.position.y, triangleVertices, commonBodyConfig);
      body = this.game.physics.Bodies.rectangle(config.position.x, config.position.y, config.width, config.height, commonBodyConfig);
      break;
  }

  if (typeof config.mass !== 'undefined') {
    if (this.game.physics && this.game.physics.setMass) {
      this.game.physics.setMass(body, config.mass);
    }
  }

  // TODO: move to BulletPlugin ?
  if (config.type === 'BULLET') {
    // set friction to 0 for bullets
    // this.game.physics.setFriction(body, 0);
    // TODO: make this config with defaults
    body.friction = 0;
    body.frictionAir = 0;
    body.frictionStatic = 0;
  }

  body.myEntityId = config.myEntityId;
  return body;
}

