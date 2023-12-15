import Plugin from '../../Plugin.js';
import { RealStone as RealStoneActual } from '../../../../RealStone/index.js';

import createEntityFromPart from './lib/createEntityFromPart.js';
import createWire from './lib/parts/createWire.js';


import testContraption from './security-system.js';
import testLight from './button-wire-light.js';

// handles input controller events and relays them to the game logic
class RealStone extends Plugin {
  static id = 'real-stone';
  constructor(game) {
    super(game);
    this.game = game; // Store the reference to the game logic
    this.id = RealStone.id;
    this.createEntityFromPart = createEntityFromPart.bind(this);
    this.createWire = createWire.bind(this);
  }

  init(game) {
    this.game = game;

    // add the system to the systems manager
    this.game.systemsManager.addSystem(this.id, this);

    console.log('RealStone.init()', RealStoneActual);
    let contraption = testLight();
    //let contraption = testContraption();
    console.log('contraption', contraption);
    
    contraption.onAny((event, ...args) => {
      console.log('contraption event', event, args);
    });

    // iterate through each part and create a corresponding entity
    contraption.parts.forEach(part => {
      let ent = this.createEntityFromPart(part, contraption)
      // console.log('create ent from part', part, ent)
      // let updated = this.game.getEntity(entity.id);
      //console.log('entity', entity)
      //console.log("updated ent", updated)
    });

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
