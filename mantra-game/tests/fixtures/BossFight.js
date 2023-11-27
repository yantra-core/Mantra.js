// BossFight.js - Marak Squires 2023
// returns a new game object with a state machine and actions
function BossFightMiddleware () {

  const resetContextForNewRound = (context, event) => {
    // Reset health and other necessary context properties for a new round
    context.health = 1000;
    // Perform any other context resets here
  };

  const spawnNewBoss = (context, event) => {
    // Logic to spawn a new boss entity
    // This could include setting new properties for the boss entity
  };

  let BossFight = {
    id: 'bossFightGame',
    initial: 'Idle',
    context: {
      name: 'boss',
      health: 1000,
    },
    states: {
      Idle: {
        on: { START: 'Active' }
      },
      Active: {
        on: {
          'entity::damage': {
            target: 'UpdateEntity', 
            cond: 'isBossDamaged'
          },
          'entity::remove': {
            target: 'EndRound', 
            cond: 'isBossDefeated'
          }
        }
      },
      UpdateEntity: {
        on: {
          COMPLETE_UPDATE: 'Active'
        },
        entry: 'calculateComponentUpdate'
      },
      EndRound: {
        // Removed type: 'final' to allow transitions out of this state
        entry: 'reloadEntities',
        on: {
          START_NEW_ROUND: 'Idle' // Transition back to 'Idle' for a new round
        }
      }
    },
    actions: {
      calculateComponentUpdate: (context, event) => {
        // Logic to calculate and apply component updates
      },
      reloadEntities: (context, event) => {
        console.log('calling xstate int reloadEntities', context, event)
        // Logic to reload all entities for a new round
      }
    },
    guards: {
      isBossDamaged: (context, event) => event.name === context.name,
      isBossDefeated: (context, event) => event.name === context.name,
    }
  };
  

  const Actions = {

    /*
    moveEntity: (context, event) => {
      // Emitting a move event for the entity
      this.game.emit('entity::move', { entityId: event.entityId, dx: event.dx, dy: event.dy, dz: event.dz });
    },
    */

    calculateComponentUpdate: (context, event) => {
      // Logic to calculate and apply component updates
      context.health -= event.damage;
  
      // Define color ranges: yellow (0xffff00) to red (0xff0000)
      const yellow = { r: 255, g: 255, b: 0 };
      const red = { r: 255, g: 0, b: 0 };
  
      // Calculate the proportion of health lost
      const maxHealth = 1000; // Assuming max health is 1000
      const healthProportion = Math.max(context.health, 0) / maxHealth;
  
      // Interpolate between yellow and red based on health proportion
      const r = yellow.r + (red.r - yellow.r) * (1 - healthProportion);
      const g = yellow.g + (red.g - yellow.g) * (1 - healthProportion);
      const b = yellow.b + (red.b - yellow.b) * (1 - healthProportion);
  
      // Convert RGB to hexadecimal color
      context.color = (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b);
    }
  };
  
  const Guards = {
    isBossDamaged: (context, event) => {
      console.log('isBossDamaged', event, context)
      return event.name === context.name;
    },
    isBossDefeated: (context, event) => {
      return event.name === context.name;
    },
  };
  
  let Game = {
    "id": "bossFightGame",
    "world": {
      "width": 800,
      "height": 600
    },
    "entities": {
      "boss": {
        "type": "NPC",
        "position": {
          x: 200,
          y: 0
        }, // Define boss's position
        height: 600,
        width: 600,
        "health": 1000
        // Additional boss properties like attack patterns, abilities, etc.
      }
    },
    "stateMachine": BossFight,
    "guards": Guards,
    "actions": Actions
  };
  
  return Game;

}

export default BossFightMiddleware;