class Plugin {
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.name = 'Plugin'; // make name required to be set?
    // registers itself in event emitter?

  }
  init() {
    throw new Error('Method "init" must be implemented');
  }
  update(deltaTime, snapshot) {
    throw new Error('Method "update" must be implemented');
  }
  render() {
    // throw new Error('Method "render" must be implemented');
  }
  destroy() {
    // throw new Error('Method "destroy" must be implemented');
  }
}

export default Plugin;