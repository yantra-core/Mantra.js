
let engine;
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


// Handlers for various physics operations, structured similarly to methods in the MatterPhysics class
const actions = {
  initEngine: ({ config }) => {
    engine = initEngine();
    postMessage({ action: 'engineInitialized' });
  },
  updateEngine: ({ delta }) => {
    Matter.Engine.update(engine, delta);
    postMessage({ action: 'engineUpdated' });
  },
  createBody: ({ options }) => {
    const body = Matter.Body.create(options);
    Matter.World.add(engine.world, body);
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