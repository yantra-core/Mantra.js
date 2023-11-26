// XState.js - Marak Squires 2023
import { createMachine, interpret } from 'xstate';

class XState {
  static id = 'xstate';
  static removable = false;
  constructor({ world }) {
    this.id = XState.id;
    this.world = world;
  }

  init(game) {
    this.game = game;
    if (this.world) {
      this.createMachine();
      this.loadEntities();
    }
    // register as system
    game.systemsManager.addSystem('xstate', this);
  }

  createMachine() {
    // Game class instance
    let game = this.game;
    // world data as JSON state machine
    let world = this.world;
    // for now, hard-code a single game
    world.stateMachine.predictableActionArguments = true;
    const worldMachine = createMachine(world.stateMachine, {
      guards: world.guards
    });
    game.machine = worldMachine;
    game.service = interpret(game.machine).onTransition((state) => {
      // Handle state transitions or notify other parts of the game
      console.log('State changed to:', state.value);
      
    });
    game.service.start();

  }

  loadEntities () {
    let game = this.game;
    let world = this.world;
    for (let name in world.entities) {
      let ent = world.entities[name];

      // TODO: tree lookup of TYPE to plugin, single depth
      if (ent.type === 'BORDER') {
        if (!game.systems.border) {
          game.use(new game.plugins.Border({}));
        }
        game.systems.border.createBorder({
          height: ent.size.height,
          width: ent.size.width,
        });
      }
      game.createEntity(ent);
    }
  }

  sendEvent (eventName, eventData) {
    let game = this.game;
    console.log('Sending event:', eventName, eventData);
    // Sending event: COLLISION { collisionType: 'goal' }
    game.service.send(eventName, eventData);
  }

  getCurrentState () {
    let game = this.game;
    return game.service.state.value;
  }

}


export default XState;