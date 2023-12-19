import Plugin from '../../Plugin.js';
import { AyCraft as AyCraftActual } from '../../../../AyCraft.js/index.js';

import createEntityFromPart from './lib/createEntityFromPart.js';
import partEventListeners from './lib/bindPartEvents.js';

import createWire from './lib/parts/createWire.js';
import bindWire from './lib/events/bindWire.js';
import bindButton from './lib/events/bindButton.js';
import bindLEDLight from './lib/events/bindLEDLight.js';
import bindActuator from './lib/events/bindActuator.js';
import bindAmplifier from './lib/events/bindAmplifer.js';
import bindLatch from './lib/events/bindLatch.js';
import bindMotionDetector from './lib/events/bindMotionDetector.js';
import bindRelay from './lib/events/bindRelay.js';
import bindPressureSensor from './lib/events/bindPressureSensor.js';
import bindRover from './lib/events/bindRover.js';

import securitySystemWithWires from './security-system-wires.js';
import testContraption from './security-system.js';
import testLight from './button-wire-light.js';
import roverLight from './rover-light.js';

// handles input controller events and relays them to the game logic
class AyCraft extends Plugin {
  static id = 'aycraft';
  constructor({ contraption = null, contraptions = null, useDefaultContraption = false } = {}) {
    super();
    this.id = AyCraft.id;
    this.contraption = contraption;
    this.contraptions = contraptions;

    this.createEntityFromPart = createEntityFromPart.bind(this);

    this.bindWire = bindWire.bind(this);
    this.createWire = createWire.bind(this);

    this.bindButton = bindButton.bind(this);
    this.bindLEDLight = bindLEDLight.bind(this);
    this.bindActuator = bindActuator.bind(this);
    this.bindAmplifier = bindAmplifier.bind(this);
    this.bindLatch = bindLatch.bind(this);
    this.bindMotionDetector = bindMotionDetector.bind(this);
    this.bindRelay = bindRelay.bind(this);
    this.bindPressureSensor = bindPressureSensor.bind(this);
    this.bindRover = bindRover.bind(this);

    this.partEventListeners = partEventListeners.bind(this);
  }

  init(game) {
    let self = this
    this.game = game;

    // add the system to the systems manager
    this.game.systemsManager.addSystem(this.id, this);
    console.log('AyCraft.init()', AyCraftActual);
    if (self.contraption) {
      self.initContraption(self.contraption);
      if (self.contraption.start) {
        // self.contraption.start();
      }

      /*
      */

    } else {
      // TODO: add config option for default contraption if none is specified at construction
      if (self.useDefaultContraption) {
        self.initContraption(roverLight());
      }
    }
  }

  initContraption(contraption) {

    if (contraption.start) {
      // contraption.start();
    }

    //console.log('contraption', contraption);
    contraption.onAny((event, ...args) => {
      // console.log('onAny contraption event', event, args);
    });

    // TODO: DRY this logic up with below
    if (contraption.parts.length > 0) {
      // iterate through each part and create a corresponding entity
      contraption.parts.forEach(part => {
        console.log("GGGGG", part)
        // bind any potential event listners for the part, based on the type of part
        this.partEventListeners(part, contraption);
        let ent = this.createEntityFromPart(part, contraption);
        // console.log('created entity', ent);
      });
    }

    if (contraption.contraptions.length > 0) {
      // iterate through each contraption and create a corresponding entity
      contraption.contraptions.forEach(contraption => {
        contraption.parts.forEach(part => {
          // bind any potential event listners for the part, based on the type of part
          this.partEventListeners(part, contraption);
          let ent = this.createEntityFromPart(part, contraption);
          // console.log('created entity', ent);
        });
      });
    }

  }

  clearAllParts() {
    this.game.entities.forEach(ent => {
      if (ent.type === 'PART') {

        // get the part and call .offFn if it exists
        let part = ent.ayCraft.part;
        if (part.unload) {
          console.log('calling part.unload', part.name)
          part.unload();
        }

        this.game.removeEntity(ent.id);
      }
      if (ent.type === 'TEXT') { // for now
        this.game.removeEntity(ent.id);
      }
    });
  }

  // TODO: add support for multiple contraptions
  setContraption(contraption) {
    console.log("Mantra.AyCraft Plugin - Setting Contraption", contraption)
    this.contraption = contraption;
    this.initContraption(contraption);
  }

  handleCollision(pair, bodyA, bodyB) {
    // console.log('real stone collisions check', pair, bodyA, bodyB)

    if (bodyA.myEntityId && bodyB.myEntityId) {
      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;

      const entityA = this.game.entities.get(entityIdA);
      const entityB = this.game.entities.get(entityIdB);

      if (!entityA || !entityB) {
        console.log('Block.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }

      if (entityA.ayCraft) {
        // trigger the part if possible
        // console.log('entityA.ayCraft', entityA.ayCraft)

    
          if (entityA.ayCraft.part.trigger) {
            entityA.ayCraft.part.trigger();
          }
          if (entityA.ayCraft.part.press) {
            entityA.ayCraft.part.press();
          }
          if (entityA.ayCraft.part.detectMotion) {
            entityA.ayCraft.part.detectMotion();
          }

          if (entityA.ayCraft.part.toggle) {
            entityA.ayCraft.part.toggle();
          }

        }

      if (entityB.ayCraft) {


          // trigger the part if possible
          // console.log('entityB.ayCraft', entityB.ayCraft)
          if (entityB.ayCraft.part.trigger) {
            entityB.ayCraft.part.trigger();
          }
          if (entityB.ayCraft.part.press) {
            entityB.ayCraft.part.press();
          }
          if (entityB.ayCraft.part.detectMotion) {
            entityB.ayCraft.part.detectMotion();
          }

          if (entityB.ayCraft.part.toggle) {
            entityB.ayCraft.part.toggle();
          }


      }

    }

  }

  update() {
  }

  render() { }

  destroy() { }

}

export default AyCraft;
