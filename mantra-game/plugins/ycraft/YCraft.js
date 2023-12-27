// import { YCraft as YCraftActual, ElectricalSignal } from '../../../../YCraft.js/index.js';
import { YCraft as YCraftActual } from 'ycraft';

import Plugin from '../../Plugin.js';

import createEntityFromPart from './lib/createEntityFromPart.js';
import partEventListeners from './lib/bindPartEvents.js';

import createWire from './lib/parts/createWire.js';
import bindWire from './lib/events/bindWire.js';
import bindButton from './lib/events/bindButton.js';
import bindDisplay from './lib/events/bindDisplay.js';
import bindLEDLight from './lib/events/bindLEDLight.js';
import bindActuator from './lib/events/bindActuator.js';
import bindAmplifier from './lib/events/bindAmplifer.js';
import bindLatch from './lib/events/bindLatch.js';
import bindMotionDetector from './lib/events/bindMotionDetector.js';
import bindRelay from './lib/events/bindRelay.js';
import bindPressureSensor from './lib/events/bindPressureSensor.js';
import bindRover from './lib/events/bindRover.js';

import contraptionExamples from './contraption-examples.js';
// import testContraption from './security-system.js';
// import testLight from './button-wire-light.js';
// import roverLight from './rover-light.js';

// handles input controller events and relays them to the game logic
class YCraft extends Plugin {
  static id = 'ycraft';
  constructor({ contraption = null, contraptions = null, useDefaultContraption = false } = {}) {
    super();
    this.id = YCraft.id;

    // for now, default behavior so it won't crash if no contraption is passed
    if (typeof contraption !== 'function') {
      // console.log("contraptionExamples", contraptionExamples)
      contraption = contraptionExamples;
    }
    this.contraption = contraption();
    this.contraptionSource = contraption.toString();
    this.contraptions = contraptions;

    this.createEntityFromPart = createEntityFromPart.bind(this);

    this.bindWire = bindWire.bind(this);
    this.createWire = createWire.bind(this);

    this.bindButton = bindButton.bind(this);
    this.bindDisplay = bindDisplay.bind(this);
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
    this.game.contraption = this.contraption;

    document.addEventListener('click', function (e) {
      // check to see if we are inside an input, textarea, button or submit
      // if so, disable inputs controls
      let target = e.target;
      let tagName = target.tagName.toLowerCase();
      let type = target.type;
     // if (tagName === 'input' || tagName === 'textarea' || tagName === 'button' || tagName === 'submit') {
     // TODO: move this to graphics plugin init?
     if (tagName === 'div') {
        game.systems['entity-input'].disableInputs();
        game.systems['keyboard'].unbindAllEvents();
      } else {
        game.systems['entity-input'].setInputsActive();
        game.systems['keyboard'].bindInputControls();
      }
    });


    // add the system to the systems manager
    this.game.systemsManager.addSystem(this.id, this);
    // console.log('YCraft.init()', YCraftActual);
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
        // self.initContraption(roverLight());
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

    // render a border box around each contraption based on its bounding box
    // console.log('placing border box around contraption positoin', contraption.position);
    /*
    let boundingBox = this.game.createEntity({
      type: 'BOX',
      color: 0x00ff00,
      width: contraption.width,
      height: contraption.height,
      position: contraption.position,
      isSensor: true
    });
    */

      // create a text label for the entity


    if (contraption.contraptions.length > 0) {
      // iterate through each contraption and create a corresponding entity
      contraption.contraptions.forEach(contraption => {
        // creates a bounding box around the contraption
        // TODO: support hollow boxes with borders
        // Remark: This will create a box around the contraption, filled
        /*
        let boundingBox = this.game.createEntity({
          type: 'BOX',
          // color: 0x00ff00,
          width: contraption.width,
          height: contraption.height,
          position: {
            x: contraption.position.x,
            y: contraption.position.y,
            z: -100
          },
          isSensor: true
        });
        */

        // place the label in top left corner of the contraption
        let contraptionLabelX = contraption.position.x + contraption.width / 10;
        let contraptionLabelY = contraption.position.y - contraption.height / 2;
        // creates a label for the contraption
        let textLabel = this.game.createEntity({
          type: 'TEXT',
          text: contraption.description,
          position: {
            x: contraptionLabelX, // Center horizontally
            y: contraptionLabelY    // Position inside the entity
          },
          style: {
            fontSize: '32px',
          },
          width: contraption.width / 2,
          height: contraption.height / 2,
          isStatic: true,
          isSensor: true
        });

        // bind any potential event listners for the part, based on the type of part
        //this.partEventListeners(contraption, contraption);
        //let ent = this.createEntityFromPart(contraption, contraption);
        // console.log('created entity', ent);
      });
    } else {
      // render a single contraption
      /*
      let boundingBox = this.game.createEntity({
        type: 'BOX',
        // color: 0x00ff00,
        width: contraption.width,
        height: contraption.height,
        position: {
          x: contraption.position.x,
          y: contraption.position.y,
          z: -100
        },
        isSensor: true
      });
      */
    }

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

        // get the part and call .offFn if it exists
        let part = ent.yCraft.part;
        if (part.unload) {
          // console.log('calling part.unload', part.name)
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
    console.log("Mantra.YCraft Plugin - Setting Contraption", contraption)
    this.contraption = contraption;
    // for now, could be better scoped as array of contraptions
    this.game.contraption = contraption;

    // redraw view if available
    if (this.game.systems['gui-ycraft']) {
      this.game.systems['gui-ycraft'].setContraption(contraption, this.contraptionSource);
    }

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

      if (entityA.yCraft) {
        // trigger the part if possible
        // console.log('entityA.yCraft', entityA.yCraft)

          let signal = new ElectricalSignal();
          signal.data = {
            entityId: entityIdB,
            entity: entityB,
            body: bodyB
          };
          if (entityA.yCraft.part.trigger) {
            entityA.yCraft.part.trigger(signal);
          }
          if (entityA.yCraft.part.press) {
            entityA.yCraft.part.press();
          }
          if (entityA.yCraft.part.detectMotion) {
            entityA.yCraft.part.detectMotion();
          }

          if (entityA.yCraft.part.toggle) {
            entityA.yCraft.part.toggle();
          }

        }

      if (entityB.yCraft) {
        let signal = new ElectricalSignal();
        signal.data = {
          entityId: entityIdA,
          entity: entityA,
          body: bodyA
        };
        // trigger the part if possible
          // console.log('entityB.yCraft', entityB.yCraft)
          if (entityB.yCraft.part.trigger) {
            entityB.yCraft.part.trigger(signal);
          }
          if (entityB.yCraft.part.press) {
            entityB.yCraft.part.press();
          }
          if (entityB.yCraft.part.detectMotion) {
            entityB.yCraft.part.detectMotion();
          }

          if (entityB.yCraft.part.toggle) {
            entityB.yCraft.part.toggle();
          }


      }

    }

  }

  update() {
  }

  render() { }

  destroy() { }

}

export default YCraft;
