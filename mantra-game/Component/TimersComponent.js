import Component from "./Component.js";

class TimersComponent extends Component {
  constructor(name, owner) {
    super(name, owner);

    this.timers = {}; // Object to hold named timers
  }

  // Set a timer with a specific duration, with optional interval flag
  setTimer(name, duration, isInterval = false) {
    this.timers[name] = {
      startTime: Date.now(),
      duration: duration * 1000, // Convert to milliseconds
      isInterval: isInterval,
      completed: false
    };
  }

  getTimer(name) {
    return this.timers[name];
  }

  checkTimer(name) {
    if (!this.timers[name]) return false;
  
    let timer = this.timers[name];
    let now = Date.now();
  
    if (!timer.completed && now >= timer.startTime + timer.duration) {
      if (timer.isInterval) {
        this.resetTimer(name); // Reset for intervals
        return 'intervalCompleted'; // Indicate interval completion
      } else {
        timer.completed = true;
        return true; // Indicate one-time timer completion
      }
    }
  
    return false; // Timer has not completed yet
  }
  
  // Reset a timer
  resetTimer(name) {
    if (this.timers[name]) {
      this.timers[name].startTime = Date.now();
      this.timers[name].completed = false;
    }
  }

  // Remove a timer
  removeTimer(name) {
    delete this.timers[name];
  }
}

export default TimersComponent;