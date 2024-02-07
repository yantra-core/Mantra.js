
import Matter from 'matter-js';
import PhysicsInterface from './PhysicsInterface.js';
import Collisions from '../collisions/Collisions.js';

import initEngine from './lib/initEngine.js';
import collisionStart from './lib/collisionStart.js';
import collisionActive from './lib/collisionActive.js';
import collisionEnd from './lib/collisionEnd.js';

import onAfterUpdate from './lib/onAfterUpdate.js';
import setBodySize from './lib/setBodySize.js';
import lockedProperties from './lib/lockedProperties.js';
import limitSpeed from './lib/limitSpeed.js';
import _setGravity from './lib/setGravity.js';

let physics = {};

physics.engine = null;

physics.Matter = Matter;
physics.engine = Matter.Engine.create()

physics.onAfterUpdate = onAfterUpdate.bind(physics);
physics.setGravity = _setGravity.bind(physics);


// Handlers for various physics operations, structured similarly to methods in the MatterPhysics class
const actions = {
  initEngine: ({ config }) => {


    physics.engine.gravity.x = config.gravity.x;
    physics.engine.gravity.y = config.gravity.y;

    Matter.Events.on(physics.engine, 'afterUpdate', function (event) {
      // physics.onAfterUpdate(physics.engine);
      let worldState = [];
      for (const body of event.source.world.bodies) {

        // let entity = that.game.getEntity(body.myEntityId);
        // let entity = that.game.data.ents._[body.myEntityId];

        if (body.isSleeping !== true && body.myEntityId) {
          let bodyState = {
            id: body.id,
            myEntityId: body.myEntityId,
            position: body.position,
            angle: body.angle,
            velocity: body.velocity,
            angularVelocity: body.angularVelocity,
            isSleeping: body.isSleeping,
            isStatic: body.isStatic,
            isSensor: body.isSensor
          };
          worldState.push(bodyState);
        }

      }
      postMessage({ action: 'engineUpdated', worldState: worldState });

    });
    postMessage({ action: 'engineInitialized' });

  },
  addToWorld: (body) => {
    Matter.World.add(physics.engine.world, body);
  },
  updateEngine: (args) => {
    Matter.Engine.update(physics.engine, args[0]);
    postMessage({ action: 'engineUpdated' });
  },
  createBody: ({ options }) => {
    console.log('createBody', options)
    const body = Matter.Body.create(options);
    Matter.World.add(physics.engine.world, body);
    postMessage({ action: 'bodyCreated', bodyId: body.id });
  },
  // Implement additional handlers corresponding to the methods in your MatterPhysics class
  // For instance, for collisionStart, collisionActive, and collisionEnd
  collisionStart: ({ data }) => {
    // Implement collision start logic here
    // This might involve setting up event listeners in Matter.js and responding to collision events
  },
  collisionActive: ({ data }) => {
    // Implement collision active logic here
  },
  collisionEnd: ({ data }) => {
    // Implement collision end logic here
  },
  setGravity({ data }) {
    _setGravity.call(physics, data);
  },
  setRotation(args) {
    physics.Matter.Body.setAngle(args[0], args[1]);
  },
  setPosition(args) {
    physics.Matter.Body.setPosition(args[0], args[1]);
  },
  setVelocity(args) {
    // Remark: This is currently not working as expected since the parent process is sending actual body
    //         We need to send a JSON representation of body using entity.id instead
    physics.Matter.Body.setVelocity(args[0], args[1]);
  },
  applyForce(args) {
    Matter.Body.applyForce(args[0], args[1], args[2]);
  }
  // Add more handlers as needed for methods like setBodySize, lockedProperties, etc.
};

onmessage = function (event) {
  const { action, data } = event.data;
  const handler = actions[action];
  // console.log('Worker received action:', action, data);
  if (handler) {
    handler(data);
  } else {
    console.error(`No handler for action: ${action}`);
  }
};