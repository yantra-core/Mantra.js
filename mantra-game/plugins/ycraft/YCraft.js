//import { YCraft as YCraftActual, ElectricalSignal } from '../../../../YCraft.js/index.js';
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
      // contraption = contraptionExamples;
    } else {
      this.contraption = contraption();
      this.contraptionSource = contraption.toString();
    }
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

    /*
    // Remark: This has been removed Jan 4 2023 since we manage disabling of 
    // of inputs in Editor, or other system. This is not the responsibility of YCraft.js plugin
    // can delete this code soon
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
    */


    // add the system to the systems manager
    this.game.systemsManager.addSystem(this.id, this);
    // console.log('YCraft.init()', YCraftActual);
    if (self.contraption) {
      self.initContraption(self.contraption);
      if (self.contraption.start) {
        // self.contraption.start();
      }
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
          color: 0x00ff00,
          width: contraption.width,
          height: contraption.height,
          position: {
            x: contraption.position.x + contraption.width / 2,
            y: contraption.position.y + contraption.height / 2,
            z: -100
          },
          isSensor: true
        });
        */
        // place the label in top left corner of the contraption
        let contraptionLabelX = contraption.position.x + contraption.width / 2;
        let contraptionLabelY = contraption.position.y + contraption.height / 10 - 5;
        // creates a label for the contraption
        let textLabel = this.game.createEntity({
          type: 'TEXT',
          body: false,
          text: contraption.description,
          position: {
            x: contraptionLabelX, // Center horizontally
            y: contraptionLabelY    // Position inside the entity
          },
          style: {
            fontSize: '16px'
          },
          width: contraption.width,
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

  collisionActive(pair, bodyA, bodyB) {
    // console.log("YCRAFT collisionActive", pair, bodyA, bodyB)
  }

  collisionEnd(pair, bodyA, bodyB) {
    // console.log('YCRAFT collisionEnd', pair, bodyA, bodyB)

    if (bodyA.myEntityId && bodyB.myEntityId) {
      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;

      const entityA = this.game.entities.get(entityIdA);
      const entityB = this.game.entities.get(entityIdB);

      if (!entityA || !entityB) {
        console.log('Block.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }

      this.processCollisionEnd(entityA, entityB, bodyB, entityIdB);
      this.processCollisionEnd(entityB, entityA, bodyA, entityIdA);
    }
  }

  handleCollision(pair, bodyA, bodyB) {
    // console.log("YCRAFT handleCollision", pair, bodyA, bodyB);
    // TODO: connect physics events for END and START
  
    if (bodyA.myEntityId && bodyB.myEntityId) {
      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;
  
      const entityA = this.game.entities.get(entityIdA);
      const entityB = this.game.entities.get(entityIdB);
  
      if (!entityA || !entityB) {
        console.log('Block.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }
  
      this.processCollisionStart(entityA, entityB, bodyB, entityIdB);
      this.processCollisionStart(entityB, entityA, bodyA, entityIdA);
    }
  }
  
  processCollisionStart(primaryEntity, secondaryEntity, secondaryBody, secondaryEntityId) {
    if (primaryEntity.yCraft) {
      // don't let wires trigger collision events with parts ( for now )
      if (primaryEntity.name === 'Wire' || (secondaryEntity.yCraft && secondaryEntity.name === 'Wire')) {
        return;
      }
      let signal = new ElectricalSignal();
      signal.data = {
        entityId: secondaryEntityId,
        entity: secondaryEntity,
        body: secondaryBody
      };
  
      this.triggerYCraftPart(primaryEntity.yCraft.part, signal);
    }
  }

  processCollisionEnd(primaryEntity, secondaryEntity, secondaryBody, secondaryEntityId) {
    // console.log('processCollisionEnd', primaryEntity, secondaryEntity, secondaryBody, secondaryEntityId)
    if (primaryEntity.yCraft && !secondaryEntity.yCraft) {
      this.releaseYCraftPart(primaryEntity.yCraft.part);
    }
  }

  releaseYCraftPart(part) {
    console.log("RELEASE PART", part)
    if (part.release) {
      part.release();
    }
  }
  
  triggerYCraftPart(part, signal) {
    // console.log("trigger", part, signal)
    if (part.trigger) {
      part.trigger(signal);
    }
    if (part.press) {
      part.press();
    }
    if (part.detectMotion) {
      part.detectMotion();
    }
    if (part.toggle) {
      part.toggle();
    }
  }
  

  update() {
  }

  render() { }

  destroy() { }

}

export default YCraft;
