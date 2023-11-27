import Plugin from '../../Plugin.js';

class Timers extends Plugin {
  static id = 'timers';
  constructor(game) {
    super(game);
    this.game = game;
    this.id = Timers.id;
  }


  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);

  }
  // Called every game loop
  update() {
    // Iterate over entities with TimersComponent
    // TODO: move this O(n) operation to a separate system, 
    // such that all components are iterated over once per game loop
    this.game.entities.forEach(entity => {
      if (entity.timers) {
        const timersComp = entity.timers;
        Object.keys(timersComp.timers).forEach(timerName => {
          const timer = timersComp.timers[timerName];
          if (!timer.completed && Date.now() >= timer.startTime + timer.duration) {
            if (timer.isInterval) {
              timersComp.resetTimer(timerName); // Reset for intervals
              this.game.emit('timers::intervalElapsed', { entity, timerName });
            } else {
              timer.completed = true;
              this.game.emit('timers::done', { entity, timerName });
            }
          }
        });
      }
    });
  }
}

export default Timers;
