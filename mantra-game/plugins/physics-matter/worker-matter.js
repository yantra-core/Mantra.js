
let engine;
import Matter from 'matter-js';
import PhysicsInterface from './PhysicsInterface.js';
import Collisions from '../collisions/Collisions.js';

// A simple event dispatch map to associate actions with handler functions
const actions = {
  initEngine: ({ config }) => {
    engine = Matter.Engine.create(config);
    postMessage({ action: 'engineInitialized' });
  },
  updateEngine: ({ delta }) => {
    Matter.Engine.update(engine, delta);
    // For simplicity, we're not sending back the entire engine state; you'll need to decide what's relevant.
    postMessage({ action: 'engineUpdated' });
  },
  createBody: ({ options }) => {
    const body = Matter.Body.create(options);
    Matter.World.add(engine.world, body);
    // You might want to send back minimal necessary information, not the whole body object
    postMessage({ action: 'bodyCreated', bodyId: body.id });
  },
  // Add more actions for other operations...
};

onmessage = function(event) {
  const { action, data } = event.data;
  const handler = actions[action];
  console.log('worker-matter.js', action, data)
  if (handler) {
    handler(data);
  } else {
    console.error(`No handler for action: ${action}`);
  }
};