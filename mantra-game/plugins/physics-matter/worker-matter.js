
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


let physics = {};

physics.engine = null;

physics.Matter = Matter;

physics.onAfterUpdate = onAfterUpdate.bind(physics);

// Handlers for various physics operations, structured similarly to methods in the MatterPhysics class
const actions = {
  initEngine: ({config}) => {

    physics.engine = Matter.Engine.create()

    physics.engine.gravity.x = config.gravity.x;
    physics.engine.gravity.y = config.gravity.y;
  
    Matter.Events.on(physics.engine, 'afterUpdate', function(event){
      physics.onAfterUpdate(physics.engine);
    });
  
    postMessage({ action: 'engineInitialized' });
  },
  addToWorld: ({ body }) => {
    console.log('addToWorld worker', body)
    Matter.World.add(physics.engine.world, body);
  },
  updateEngine: ({ delta }) => {
    Matter.Engine.update(physics.engine, delta);
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
  // Add more handlers as needed for methods like setBodySize, lockedProperties, etc.
};

onmessage = function(event) {
  const { action, data } = event.data;
  const handler = actions[action];
  console.log('Worker received action:', action, data);
  if (handler) {
    handler(data);
  } else {
    console.error(`No handler for action: ${action}`);
  }
};