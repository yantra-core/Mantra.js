import Plugin from '../../Plugin.js';

// handles input controller events and relays them to the game logic
class Logger extends Plugin {
  constructor(game) {
    super(game);
    this.game = game; // Store the reference to the game logic
    this.name = 'Logger';
  }

  init() {
    // console.log('Logger.init()');
    /*
    this.game.on('**', (ev) => {
      console.log('eeeeeeee', ev);
    });
    */
  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Logger;
