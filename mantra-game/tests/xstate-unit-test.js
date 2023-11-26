import tap from 'tape';
import {Game, plugins} from '../Game.js';
import Pong from './fixtures/PongWorld.js';

tap.test('Machine creation and initialization', (t) => {

  let game = new Game({
    isServer: true
  });

  game.use(new plugins.XState({
    world: Pong
  }));

  //console.log(game.systemsManager.systems)
  let system = game.getSystem('xstate');
  system.createMachine();

  t.ok(game.machine, 'Machine should be initialized');
  t.equal(game.machine.initialState.value, 'Idle', 'Initial state should be Idle');
  t.end();
});


tap.test('State transitions', (t) => {
  let game = new Game({ isServer: true });
  game.use(new plugins.XState({ world: Pong }));
  
  let xStateSystem = game.getSystem('xstate');
  xStateSystem.createMachine();
  xStateSystem.sendEvent('START');

  setImmediate(() => {
    t.equal(xStateSystem.getCurrentState(), 'Playing', 'State should transition to Playing on START event');
    t.end();
  });
});

tap.test('Loading entities', (t) => {
  let game = new Game({ isServer: true });
  game.use(new plugins.XState({ world: Pong }));


  console.log(game.entities)
  let borderTop = game.getEntity(3);
  t.ok(borderTop, 'Border entity should be loaded');
  // check type and properties
  t.equal(borderTop.type, 'BORDER', 'Border entity should have type BORDER');
  t.equal(borderTop.height, 200, 'Border entity should have height of 20');
  t.end();
});

tap.test('Guard conditions', (t) => {
  let game = new Game({ isServer: true });
  game.use(new plugins.XState({ world: Pong }));

  let xStateSystem = game.getSystem('xstate');
  xStateSystem.createMachine();

  xStateSystem.sendEvent('START');


  xStateSystem.sendEvent('COLLISION', { collisionType: 'goal' });

  setImmediate(() => {
    t.equal(xStateSystem.getCurrentState(), 'Scored', 'State should transition to Scored on goal collision');
    t.end();
  });
});
