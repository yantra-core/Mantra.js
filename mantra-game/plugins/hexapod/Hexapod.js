// Hexapod.js - Marak Squires 2023
export default class Hexapod {
  static id = 'hexapod';
  static type = 'sutra';
  constructor(config = {}) {
    this.id = Hexapod.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('hexapod', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    //let rules = this.sutra();
    return {
      type: 'HEXAPOD',
      texture: 'demon',
      width: 8,
      height: 8,
      collisionStart: this.grow.bind(this),
      update: this.think.bind(this),
      position: {
        x: x,
        y: y
      }
    };
  }
  
  grow(a, b, pair, context) {
    // eats bullets and grows
    if (context.target.type === 'BULLET') {
      let hexapod = context.owner;
      let style;
      // at a certain size, invert the colors
      if (hexapod.width > 16) {
        style = {
          // Define the animation name and duration
          animation: 'pulse-invert 5s',
          // Initial filter style
          filter: 'invert(90%)'
        }
      }
      // update entity size by 11%
      game.updateEntity({
        id: hexapod.id,
        width: hexapod.width * 1.1,
        height: hexapod.height * 1.1,
        style: style
      });
    }

  }

  think(entity) {

    let gameState = this.game.data;
    let game = this.game;
    let Vector = this.game.systems.physics.Vector;

    // Define constant values for different forces and parameters
    const ALIGNMENT_FORCE = 0.1;
    const COHESION_FORCE = 0.4;
    const SEPARATION_FORCE = 0.81;
    const PERCEPTION_RADIUS = 1500;
    const FIELD_OF_VIEW = 1500;

    let hexapod = entity;
    let hexapods = gameState.ents.HEXAPOD;
    let alignment = { x: 0, y: 0 };
    let cohesion = { x: 0, y: 0 };
    let separation = { x: 0, y: 0 };
    let planetAvoidance = { x: 0, y: 0 };

    // Target movement implementation
    let targetForce = { x: 0, y: 0 };

    if (typeof gameState.currentPlayer !== 'undefined') {
      if (gameState.currentPlayer) {
        let target = gameState.currentPlayer.position;
        let targetDirection = Vector.sub(target, hexapod.position);
        targetForce = Vector.mult(Vector.normalize(targetDirection), COHESION_FORCE);
      }

    }

    // Process each hexapod in the field of view
    hexapods.forEach(otherHexapod => {

      if (otherHexapod.id !== hexapod.id) {
        let d = Vector.magnitude(Vector.sub(hexapod.position, otherHexapod.position));

        // Alignment
        if (d < PERCEPTION_RADIUS) {
          alignment = Vector.add(alignment, otherHexapod.velocity);
        }

        // Cohesion
        if (d < PERCEPTION_RADIUS) {
          cohesion = Vector.add(cohesion, otherHexapod.position);
        }

        // Separation
        if (d < hexapod.width + otherHexapod.width) {
          let diff = Vector.sub(hexapod.position, otherHexapod.position);
          separation = Vector.add(separation, Vector.div(diff, d * d)); // Weight by distance
        }
      }
    });

    // Average out alignment, cohesion, and separation
    if (hexapods.length > 1) {
      alignment = Vector.div(alignment, hexapods.length - 1);
      cohesion = Vector.div(cohesion, hexapods.length - 1);
      cohesion = Vector.sub(cohesion, hexapod.position);
      separation = Vector.div(separation, hexapods.length - 1);
    }

    alignment = Vector.mult(Vector.normalize(alignment), ALIGNMENT_FORCE);
    cohesion = Vector.mult(Vector.normalize(cohesion), COHESION_FORCE);
    separation = Vector.mult(Vector.normalize(separation), SEPARATION_FORCE);

    // Apply forces
    let force = Vector.add(Vector.add(Vector.add(alignment, cohesion), separation), targetForce);
    // Update hexapod position
    let newPosition = Vector.add(hexapod.position, Vector.mult(force, 1));
    newPosition.z = 1; // for now
    game.updateEntity({
      id: hexapod.id,
      position: newPosition
    });

  }

  // TODO: rename to create? we probably need this.createEntity scope preserved for scene
  createEntity(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the Hexapod entity
    const hexapod = game.createEntity(this.build(entityData));
  }

}