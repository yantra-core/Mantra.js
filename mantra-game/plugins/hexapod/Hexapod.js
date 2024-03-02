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
      entityData.position = { x: 0, y: 0, z: 1 };
    }
    return {
      type: 'HEXAPOD',
      texture: 'hexapod-single',
      width: 8,
      height: 8,
      health: 50,
      body: true,
      collisionStart: this.grow.bind(this),
      update: this.swarmBehavior.bind(this),
      position: entityData.position
    };
  }
  
  grow(a, b, pair, context) {
    let game = this.game;
    // eats bullets and grows
    if (context.target.type === 'BULLET') {
      let hexapod = context.owner;
      let style;

      hexapod.health = hexapod.health - 10;

      console.log('bullet velocity', context.target.velocity);

      // at a certain size, invert the colors
      if (hexapod.health < 50) {
        style = {
          // Define the animation name and duration
          animation: 'pulse-invert 2s',
          // Initial filter style
          filter: 'invert(90%)'
        }
      }
      // update entity size by 11%
      game.updateEntity({
        id: hexapod.id,
        health: hexapod.health,
        style: style
      });

      // apply a force to the Hexapod based on the bullet's velocity
      // invert the force
      let force = {
        x: -context.target.velocity.x * 10,
        y: -context.target.velocity.y * 10
      };
      game.applyForce(hexapod.id, force);

    }

  }

  swarmBehavior(entity) {

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

  groupLimitSwarmBehavior(entity) {
    let gameState = this.game.data;
    let game = this.game;
    let Vector = this.game.systems.physics.Vector;
  
    const ALIGNMENT_FORCE = 0.1;
    const COHESION_FORCE = 0.4;
    const SEPARATION_FORCE = 0.81;
    const GROUP_SEPARATION_FORCE = 1.2;
    const PERCEPTION_RADIUS = 1500;
    const GROUP_SEPARATION_RADIUS = 600;
    const GROUP_LIMIT = 3;
    const GROUP_TOLERANCE = 0.8; // 80% tolerance over the GROUP_LIMIT
  
    let hexapod = entity;
    let hexapods = gameState.ents.HEXAPOD;
    let alignment = { x: 0, y: 0 };
    let cohesion = { x: 0, y: 0 };
    let separation = { x: 0, y: 0 };
    let groupSeparation = { x: 0, y: 0 };
    let groupMembers = [];
    let otherGroups = [];
  
    let targetForce = { x: 0, y: 0 };
    if (typeof gameState.currentPlayer !== 'undefined' && gameState.currentPlayer) {
      let target = gameState.currentPlayer.position;
      let targetDirection = Vector.sub(target, hexapod.position);
      targetForce = Vector.mult(Vector.normalize(targetDirection), COHESION_FORCE);
    }
  
    hexapods.forEach(otherHexapod => {
      if (otherHexapod.id !== hexapod.id) {
        let d = Vector.magnitude(Vector.sub(hexapod.position, otherHexapod.position));
        let joinGroupChance = Math.random();
  
        if (d < PERCEPTION_RADIUS && (groupMembers.length < GROUP_LIMIT || joinGroupChance < GROUP_TOLERANCE)) {
          groupMembers.push(otherHexapod);
          alignment = Vector.add(alignment, otherHexapod.velocity);
          cohesion = Vector.add(cohesion, otherHexapod.position);
        } else if (d < GROUP_SEPARATION_RADIUS) {
          otherGroups.push(otherHexapod);
        }
  
        if (d < hexapod.width + otherHexapod.width) {
          let diff = Vector.sub(hexapod.position, otherHexapod.position);
          separation = Vector.add(separation, Vector.div(diff, d * d));
        }
      }
    });
  
    otherGroups.forEach(otherHexapod => {
      let diff = Vector.sub(hexapod.position, otherHexapod.position);
      let d = Vector.magnitude(diff);
      if (d > 0) {
        groupSeparation = Vector.add(groupSeparation, Vector.div(diff, d * d));
      }
    });
  
    if (groupMembers.length > 0) {
      alignment = Vector.div(alignment, groupMembers.length);
      cohesion = Vector.div(cohesion, groupMembers.length);
      cohesion = Vector.sub(cohesion, hexapod.position);
    }
  
    alignment = Vector.mult(Vector.normalize(alignment), ALIGNMENT_FORCE);
    cohesion = Vector.mult(Vector.normalize(cohesion), COHESION_FORCE);
    separation = Vector.mult(Vector.normalize(separation), SEPARATION_FORCE);
    groupSeparation = Vector.mult(Vector.normalize(groupSeparation), GROUP_SEPARATION_FORCE);
  
    let force = Vector.add(Vector.add(Vector.add(Vector.add(alignment, cohesion), separation), groupSeparation), targetForce);
  
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