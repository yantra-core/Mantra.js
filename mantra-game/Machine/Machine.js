// Machine.js - Marak Squires 2023
import { createMachine, interpret } from 'xstate';
import Pong from '../tests/fixtures/PongWorld.js';

const Machine = {};

Machine.createMachine = function (game) {
  // for now, hard-code a single game
  const pongMachine = createMachine(Pong.stateMachine, {
    guards: Pong.guards
  });
  game.machine = pongMachine;
  game.service = interpret(game.machine).onTransition((state) => {
    // Handle state transitions or notify other parts of the game
    console.log('State changed to:', state.value);
  });
  game.service.start();
}

Machine.loadEntities = function (game) {
  for (let name in Pong.entities) {
    let ent = Pong.entities[name];
    if (ent.type === 'BORDER') {
      game.use(new game.plugins.Border({}));
      game.systems.border.createBorder({
        height: ent.size.height,
        width: ent.size.width,
      });
    }
    game.createEntity(ent);
  }
}

// Function to send events to the state machine
Machine.sendEvent = function (eventName, eventData) {
  game.service.send(eventName, eventData);
}

// Function to get the current state
Machine.getCurrentState = function () {
  return game.service.state.value;
}

export default Machine;