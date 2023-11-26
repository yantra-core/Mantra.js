
// xstate-bossfight-test.js - Marak Squires 2023
import tap from 'tape';
import { Game, plugins } from '../Game.js';
import BossFight from './fixtures/BossFight.js';

tap.test('Machine creation and initialization', (t) => {
  let game = new Game({ isServer: true });

  let freshBossFight = BossFight();
  game.use(new plugins.XState({ world: freshBossFight }));

  let system = game.getSystem('xstate');
  system.createMachine();

  t.ok(game.machine, 'Machine should be initialized');
  t.equal(game.machine.initialState.value, 'Idle', 'Initial state should be Idle');
  t.deepEqual(game.machine.context, { name: 'boss', health: 1000 }, 'Initial context should be correctly set');
  t.end();
});

tap.test('State transitions: Idle to Active', (t) => {
  let game = new Game({ isServer: true });

  let freshBossFight = BossFight();
  game.use(new plugins.XState({ world: freshBossFight }));

  let xStateSystem = game.getSystem('xstate');
  xStateSystem.createMachine();
  xStateSystem.sendEvent('START');

  setImmediate(() => {
    t.equal(xStateSystem.getCurrentState(), 'Active', 'State should transition to Active on START event');
    t.end();
  });
});

tap.test('Loading entities: Boss Entity', (t) => {
  let game = new Game({ isServer: true });

  let freshBossFight = BossFight();
  game.use(new plugins.XState({ world: freshBossFight }));

  let boss = game.getEntity(1);
  t.ok(boss, 'NPC entity should be loaded');
  t.equal(boss.type, 'NPC', 'Boss entity should have type NPC');
  t.equal(boss.health, 1000, 'Boss entity should have health of 1000');
  t.end();
});

tap.test('Guard conditions: Entity Damaged', (t) => {
  let game = new Game({ isServer: true });

  let freshBossFight = BossFight();
  game.use(new plugins.XState({ world: freshBossFight }));

  let xStateSystem = game.getSystem('xstate');
  xStateSystem.createMachine();

  xStateSystem.sendEvent('START');
  xStateSystem.sendEvent('entity::damage', { name: 'boss', damage: 100 });

  setImmediate(() => {
    t.equal(xStateSystem.getCurrentState(), 'Active', 'State should transition to back to Active state on entity::damage event');
    t.end();
  });
});

tap.test('Boss Health Reduction', (t) => {
  let game = new Game({ isServer: true });

  let freshBossFight = BossFight();
  game.use(new plugins.XState({ world: freshBossFight }));
  
  let xStateSystem = game.getSystem('xstate');
  xStateSystem.createMachine();
  xStateSystem.sendEvent('START');

  // Simulate multiple damage events
  xStateSystem.sendEvent('entity::damage', { name: 'boss', damage: 100 });
  // xStateSystem.sendEvent('COMPLETE_UPDATE');
  xStateSystem.sendEvent('entity::damage', { name: 'boss', damage: 200 });

  setImmediate(() => {
    // Assuming your game logic reduces boss health
    let boss = game.findEntity('boss'); // Adjust this line to match how you access the boss entity
    t.equal(boss.health, 700, 'Boss health should be reduced to 700');
    t.end();
  });
});

tap.test('Transition to Victory State', (t) => {
  let game = new Game({ isServer: true });

  let freshBossFight = BossFight();
  game.use(new plugins.XState({ world: freshBossFight }));

  let xStateSystem = game.getSystem('xstate');
  xStateSystem.createMachine();
  xStateSystem.sendEvent('START');

  // Simulate boss defeat
  xStateSystem.sendEvent('entity::remove', { name: 'boss' });

  setImmediate(() => {
    t.equal(xStateSystem.getCurrentState(), 'Victory', 'State should transition to Victory on boss defeat');
    t.end();
  });
});


tap.test('Complete Boss Fight Flow', (t) => {
  let game = new Game({ isServer: true });

  let freshBossFight = BossFight();
  game.use(new plugins.XState({ world: freshBossFight }));

  let xStateSystem = game.getSystem('xstate');
  xStateSystem.createMachine();
  
  // Start the boss fight
  xStateSystem.sendEvent('START');
  t.equal(xStateSystem.getCurrentState(), 'Active', 'Initial state should be Active');

  // Simulate damaging the boss
  xStateSystem.sendEvent('entity::damage', { name: 'boss', damage: 500 });
  // Check for state and boss health
  let boss = game.findEntity('boss');
  t.equal(boss.health, 500, 'Boss health should be reduced after damage');

  // Simulate boss defeat
  xStateSystem.sendEvent('entity::remove', { name: 'boss' });
  t.equal(xStateSystem.getCurrentState(), 'Victory', 'State should transition to Victory on boss defeat');

  t.end();
});
