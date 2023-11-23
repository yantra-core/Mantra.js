// PongWorld.js - Marak Squires 2023
import Plugin from '../../../Plugin.js';

// handles input controller events and relays them to the game logic
class PongWorld extends Plugin {
  static id = 'pong-world';
  constructor(game) {
    super(game);
    this.id = PongWorld.id;
  }

  init(game) {

    game.systems['entity-input'].controlMappings = {
      W: 'MOVE_FORWARD',
      S: 'MOVE_BACKWARD'
    };

    let leftSide = game.width / 3 * -1;

    //
    // Create the Player
    //
    game.createEntity({
      id: game.currentPlayerId, // TODO: replace this
      type: 'PLAYER',
      shape: 'rectangle',
      restitution: 0, // bounciness
      mass: 90000,
      height: 300,
      width: 40,
      friction: 0,  // Default friction
      frictionAir: 0, // Default air friction
      frictionStatic: 0, // Default static friction
      lockedProperties: {
        position: {
          x: leftSide
        }
      }
    });

    //
    // Create the Ball
    //
    game.createEntity({
      id: 'game-ball',
      type: 'BALL',
      x: 0,
      y: 500,
      height: 50,
      width: 50,
      velocity: { // set initial velocity
        x: 8,
        y: 8
      },
      maxSpeed: 20,
      restitution: 2.5, // bounciness
      friction: 0,  // Default friction
      frictionAir: 0, // Default air friction
      frictionStatic: 0, // Default static friction
    });

    // Register collision events
    game.on('collisionStart', ({ pair, bodyA, bodyB }) => {
      // check to see if ball and left or right walls, if so goal
      console.log('collisionStart', bodyA.entity, bodyB.entity)
      if (!bodyA.entity || !bodyB.entity) {
        return;
      }

      if (bodyA.entity.type === 'BORDER' && bodyB.entity.type === 'BALL') {

        /*
        let invertedVelocity = {
          x: bodyB.entity.velocity.x * 1.2,
          y: bodyB.entity.velocity.y * 1.2
        }
    
        if (bodyB.entity.velocity.x === 0 && bodyB.entity.velocity.y === 0) {
          invertedVelocity = {
            x: bodyB.entity.velocity.x,
            y: bodyB.entity.velocity.y * -1.2
          }
        }
    
        if (bodyA.entity.id === 'border-left' || bodyA.entity.id === 'border-right') {
          console.log(bodyA.entity.id)
          console.log('setVelocity', bodyB.entity, invertedVelocity)
          let resetPosition = {
            x: 0,
            y: 0
          };
          //game.physics.setPosition(bodyB, resetPosition)
          // game.components.position.set(bodyB.entity.id, resetPosition);
    
        }
        */

        // game.components.velocity.set(bodyB.entity.id, invertedVelocity);
        // attempt to ovveride anyway
        /*
        game.components.velocity.set(bodyB.entity.id, {
          x: -10,
          y: -10
        });
        */
        // console.log('current V', bodyA.velocity)

      }

    })

    game.on('collisionActive', (event) => {
      console.log('collisionActive', event)
    })

    game.on('collisionEnd', (event) => {
      console.log('collisionEnd', event)
    })

  }

  update() {
  }

  render() { }

  destroy() { }

}

export default PongWorld;
