import Plugin from '../../Plugin.js';
import TimersComponent from '../../Component/TimersComponent.js';

class Timers extends Plugin {
  static id = 'timers';
  constructor(game) {
    super(game);
    this.game = game;
    this.id = Timers.id;
    this.systemTimers = {};
  }


  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
    this.game.createTimer = this.createTimer.bind(this);

  }

  createTimer (timerName, duration, isInterval = false) {
    let timer = new TimersComponent(timerName, duration, isInterval);
    this.systemTimers[timerName] = timer;
    return timer;
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
          // console.log('timerName', timerName, entity.id)
          const timer = timersComp.timers[timerName];
          if (!timer.completed && Date.now() >= timer.startTime + timer.duration) {
            // console.log('timer done', entity.id, timerName, timer)
            timer.done = true;
            if (timer.isInterval) {
              timersComp.resetTimer(timerName); // Reset for intervals
              this.game.emit('timer::done', entity, timerName, timer);
            } else {
              timer.completed = true;
              this.game.emit('timer::done', entity, timerName, timer);
            }

            if (this.game.data) {
              // if data.timer && data.
              this.game.data.timers = this.game.data.timers || [];
              this.game.data.timers.push({
                entityId: entity.id,
                entity: entity,
                gameType: 'timer',
                timerName: timerName,
                timer: timer
              });
            }


          }
        });
      }
    });
  }
}

export default Timers;
