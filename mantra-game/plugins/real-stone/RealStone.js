import Plugin from '../../Plugin.js';
import { RealStone as RealStoneActual } from '../../../../RealStone/index.js';

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
class RealStone extends Plugin {
  static id = 'realstone';
  constructor({ contraption = null, contraptions = null, useDefaultContraption = false } = {}) {
    super();
    this.id = RealStone.id;
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
    console.log('RealStone.init()', RealStoneActual);
    if (self.contraption) {

      if (self.contraption.start) {
        self.initContraption.call(self.contraption);

      } else {
        self.initContraption.start();
      }

    } else {
      // TODO: add config option for default contraption if none is specified at construction
      if (self.useDefaultContraption) {
        self.initContraption(roverLight());
      }
    }
  }

  initContraption(contraption) {

    if (contraption.start) {
      contraption.start();
    }

    //console.log('contraption', contraption);
    contraption.onAny((event, ...args) => {
      // console.log('onAny contraption event', event, args);
    });

    // TODO: DRY this logic up with below
    if (contraption.parts.length > 0) {
      // iterate through each part and create a corresponding entity
      contraption.parts.forEach(part => {
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
        this.game.removeEntity(ent.id);
      }
      if (ent.type === 'TEXT') { // for now
        this.game.removeEntity(ent.id);
      }

    });
  }

  // TODO: add support for multiple contraptions
  setContraption(contraption) {
    console.log("Mantra.RealStone Plugin - Setting Contraption", contraption)
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

      if (entityA.realStone) {
        // trigger the part if possible
        // console.log('entityA.realStone', entityA.realStone)
        if (entityA.realStone.part.trigger) {
          entityA.realStone.part.trigger();
        }
        if (entityA.realStone.part.press) {
          entityA.realStone.part.press();
        }
        if (entityA.realStone.part.detectMotion) {
          entityA.realStone.part.detectMotion();
        }
      }

      if (entityB.realStone) {
        // trigger the part if possible
        // console.log('entityB.realStone', entityB.realStone)
        if (entityB.realStone.part.trigger) {
          entityB.realStone.part.trigger();
        }
        if (entityB.realStone.part.press) {
          entityB.realStone.part.press();
        }
        if (entityB.realStone.part.detectMotion) {
          entityB.realStone.part.detectMotion();
        }
      }

    }

  }

  update() {
  }

  render() { }

  destroy() { }

}

export default RealStone;
