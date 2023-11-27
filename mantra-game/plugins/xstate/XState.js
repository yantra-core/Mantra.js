// XState.js - Marak Squires 2023
import { createMachine, interpret } from 'xstate';




class XState {
  static id = 'xstate';
  static removable = false;
  constructor({ world }) {
    this.id = XState.id;
    this.world = world;
    this.debug = true;
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
    let self = this;
    // Game class instance
    let game = this.game;
    // world data as JSON state machine
    let world = this.world;
    // for now, hard-code a single game
    world.stateMachine.predictableActionArguments = true;
    const worldMachine = createMachine(world.stateMachine, {
      guards: world.guards,
      actions: world.actions
    });
    game.machine = worldMachine;
    game.service = interpret(game.machine).onTransition((state) => {
      // Handle state transitions or notify other parts of the game
      if (self.debug) {
        console.log('State changed to:', state.value, state.changes, state.context);
      }

      if (state.matches('EndRound')) {
        // If the state is 'EndRound', call the method to reload entities
        this.reloadEntities();
        return;
      }

      // TODO: make this separate fn
      function applyStateChange (context) {
        // TODO: make this work for array of entities
        let ent = game.findEntity(context.name);
        if (ent) {
          // TODO: map all components
          let components = ['health', 'color'];
          components.forEach((component) => {
            if (context[component]) {
              // console.log('setting component', component, context[component])
              ent[component] = context[component];
              world.entities[context.name][component] = context[component];
              game.components[component].data[ent.id] = context[component];
            }
          });
          game.inflateEntity(ent);
        }
      }
      if (state.value === 'UpdateEntity') {
        applyStateChange(state.context);
        this.sendEvent('COMPLETE_UPDATE');
      }
    });
    game.service.start();

  }

  loadEntities () {
    let game = this.game;
    let world = this.world;
    for (let name in world.entities) {
      let ent = world.entities[name];
      ent.name = name;
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

  reloadEntities() {
    // Logic to reload all entities from the game JSON
    this.loadEntities(); // Assuming this method loads the entities
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