// BossFight.js - Marak Squires 2023
// returns a new game object with a state machine and actions
function BossFightMiddleware () {

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
      return event.name === context.name && event.type === 'ENTITY_DAMAGED';
    },
    isBossDefeated: (context, event) => {
      return event.name === context.name && event.type === 'ENTITY_DESTROYED';
    },
  };
  
  let Game = {
    "id": "bossFightGame",
    "world": {
      "width": 800,
      "height": 600
    },
    "entities": {
      "player": {
        "type": "PLAYER",
        "position": {
          x: -200,
          y: -600
        }
      },
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