// BossFight.js - Marak Squires 2023
// returns a new game object with a state machine and actions
function BossFightMiddleware () {

  let BossFight = {
    id: 'bossFightGame',
    initial: 'Idle',
    context: {
      name: 'boss', // Assuming 'boss' is the ID of the boss entity
      health: 1000, // Initial health of the boss
    },
    states: {
      Idle: {
        on: { START: 'Active' }
      },
      Active: {
        on: {
          ENTITY_DAMAGED: {
            target: 'UpdateEntity', 
            cond: 'isBossDamaged'
          },
          ENTITY_DESTROYED: {
            target: 'Victory', 
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
      Victory: {
        type: 'final',
        // Additional actions or events after the boss is defeated
      }
    },
    on: {
      // Define global event handlers if needed
    }
  };
  
  const Actions = {
    calculateComponentUpdate: (context, event) => {
      // Logic to calculate and apply component updates
      context.health -= event.damage;
      // console.log("Component context updates calculated:", context);
    },
    // ... other actions
  };
  
  const Guards = {
    isBossDamaged: (context, event) => {
      // console.log("checking isBossDamaged", context, event);
      // console.log("isBossDamaged Guard condition check:", context, event);
      return event.name === context.name && event.type === 'ENTITY_DAMAGED';
    },
    isBossDefeated: (context, event) => {
      return event.name === context.name && event.type === 'ENTITY_DESTROYED';
    },
  };
  
  
  const healthThresholds = {
    PhaseTwo: 700, // Example threshold for Phase Two
    PhaseThree: 300, // Example threshold for Phase Three
  };
  
  let Game = {
    "id": "bossFightGame",
    "world": {
      "width": 800,
      "height": 600,
      "background": "arena", // Example background
    },
    "entities": {
      "player": {
        "type": "PLAYER",
        "position": {
          x: 100,
          y: 100
        }, // Define player's starting position
        // Additional player properties
      },
      "boss": {
        "type": "BOSS",
        "position": {
          x: 400,
          y: 300
        }, // Define boss's position
        height: 100,
        width: 100,
        "health": 1000, // Example boss health
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