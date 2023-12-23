class XState {
  static id = 'XState';
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = XState.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    // Use Plugins to extend the game with new functionality

    // Adds projectile Bullets to the game
    game.use('Bullet');

    // Adds Health to the game
    game.use('Health');

    // Adds destructible Blocks to the game
    game.use('Block');

    // Adds a nice StarField background
    game.use('StarField');

    /*
    game.use('Editor', {
      sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/xstate-matter-babylon.html'
    });
    */

    function BossFightMiddleware() {

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
          console.log('isBossDamaged', context, event);
          return event.name === context.name && event.type === 'entity::damage';
        },
        isBossDefeated: (context, event) => {
          console.log('isBossDefeated', context, event);
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
          "boss": {
            "type": "NPC",
            "position": {
              x: -200,
              y: -600
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

    game.on('plugin::ready::XState', () => {
      game.createDefaultPlayer();
      game.systems['xstate'].loadEntities();

    });

    game.use('XState', {
      world: BossFightMiddleware()
    })
    // game.use('StarField');

    game.systems.graphics.switchGraphics('PhaserGraphics', function(){

    });

  }

  update() {}

  render() { }

  destroy() { }

  unload () {
    game.systems['xstate'].unload();
  }

}

export default XState;