import Plugin from '../../Plugin.js';
import { RealStone as RealStoneActual } from '../../../../RealStone/index.js';

import testContraption from './security-system.js';
import testLight from './button-wire-light.js';

// handles input controller events and relays them to the game logic
class RealStone extends Plugin {
  static id = 'real-stone';
  constructor(game) {
    super(game);
    this.game = game; // Store the reference to the game logic
    this.id = RealStone.id;
  }

  init(game) {
    this.game = game;

    // add the system to the systems manager
    this.game.systemsManager.addSystem(this.id, this);

    console.log('RealStone.init()', RealStoneActual);
    let contraption = testLight();
    console.log('contraption', contraption);
    
    contraption.onAny((event, ...args) => {
      console.log('contraption event', event, args);
    });


    // iterate through each part and create a corresponding entity
    contraption.parts.forEach(part => {

      if (part.type === 'LEDLight') {
        part.on('on', () => {
          // set the tint of the entity to yellow
          console.log('LEDLight on', part);
          this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
        });
        part.on('off', () => {
          // set the tint of the entity to yellow
          console.log('LEDLight off', part);
          this.game.updateEntity({ id: part.entityId, color: 0xffffff });
        });
      }

      let entity;
      if (part.type === 'Wire') {
        console.log('wire part, render string', part);
      
        // Create a line segment for each unique connection pair
        part.inputs.forEach(input => {
          part.outputs.forEach(output => {
            // Calculate midpoint, angle, and length for the segment
            const midpoint = { 
              x: (input.position.x + output.position.x) / 2, 
              y: (input.position.y + output.position.y) / 2,
              z: (input.position.z + output.position.z) / 2
            };

            const angle = Math.atan2(output.position.y - input.position.y, output.position.x - input.position.x);
            const length = Math.hypot(output.position.x - input.position.x, output.position.y - input.position.y);
            console.log('mmmmmmmmmmmmmmmmmmmm', midpoint, angle, length)
      
            entity = this.game.createEntity({
              type: 'PART', // Assuming LINE is a type for thin boxes
              position: midpoint,
              width: length,
              height: 1, // Assuming height is minimal for a line
              angle: angle,
              isStatic: true,
              realStone: {
                part: part,
                contraption: contraption
              }
            });
          });
        });
      }
       else {
        // Handle non-wire parts
        entity = this.game.createEntity({
          type: 'PART',
          position: part.position,
          width: part.size.width,
          height: part.size.height,
          isStatic: true,
          realStone: {
            part: part,
            contraption: contraption
          }
        });
      }

      part.entityId = entity.id;

      let updated = this.game.getEntity(entity.id);
      //console.log('entity', entity)
      //console.log("updated ent", updated)

    });

  }

  handleCollision(pair, bodyA, bodyB) {
    console.log('real stone collisions check', pair, bodyA, bodyB)



    if (bodyA.myEntityId && bodyB.myEntityId) {
      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;

      const entityA = this.game.entities.get(entityIdA);
      const entityB = this.game.entities.get(entityIdB);
      console.log('entityA', entityA)
      console.log('entityB', entityB)
      if (!entityA || !entityB) {
        console.log('Block.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }


      if (entityA.realStone) {
        // trigger the part if possible
        console.log('entityA.realStone', entityA.realStone)
        if (entityA.realStone.part.trigger) {
          entityA.realStone.part.trigger();
        }
        if (entityA.realStone.part.press) {
          entityA.realStone.part.press();
        }
      }

      if (entityB.realStone) {
        // trigger the part if possible
        console.log('entityB.realStone', entityB.realStone)
        if (entityB.realStone.part.trigger) {
          entityB.realStone.part.trigger();
        }
        if (entityB.realStone.part.press) {
          entityB.realStone.part.press();
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
