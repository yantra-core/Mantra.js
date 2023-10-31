import RendererInterface from '../RendererInterface.js';

class jQueryRenderer extends RendererInterface {
  constructor({ debug = true, onlineMode = true }) {
    super();
    this.onlineMode = onlineMode;
    this.entityStates = {};
    this.debug = debug;
  }

  init() {

    // Only initialize DebugGUI if debug flag is set to true
    if (this.debug) {}
    // leave always on ( for now )
    this.initDebugUI();

  }

  initDebugUI() {
    // Create a debug UI container
    const debugUIContainer = document.createElement('div');
    debugUIContainer.id = 'debugUIContainer';
    //debugUIContainer.style.position = 'absolute';
    debugUIContainer.style.top = '10px';
    debugUIContainer.style.right = '10px';
    debugUIContainer.style.width = '98vw';
    debugUIContainer.style.height = '50vw';

    debugUIContainer.style.background = 'rgba(0, 0, 0, 0.5)';
    debugUIContainer.style.padding = '10px';
    debugUIContainer.style.color = 'white';
    debugUIContainer.style.zIndex = '9999';

    document.body.appendChild(debugUIContainer);

  }

  setGame(game) {
    this.game = game;
  }

  render(game) {
    // not really used for simple HTML jQuery renderer
  }

  update(snapshot) {
    // called each time new gametick data arrives
      // TODO: inflate method(), which does update or create or destroy, etc
      // TODO: better rendering of snapshots states
      // TODO: perform JSON.stringify of snapshot.state
      // TODO: each snapshot should be a row
      // TODO: should truncate previous entries after 100
      // TODO: should always be scrolled to bottom, unless
      //       - autoscroll to bottom should disable if user manual scrolls

    for (const state of snapshot.state) {
      console.log(state)
      const entityDebugInfo = document.createElement('div');
      entityDebugInfo.innerHTML = `Entity ID: ${state.id}, Position: (${JSON.stringify(state, true, 2)})`;
      // Append the entity information to the debug UI container
      debugUIContainer.appendChild(entityDebugInfo);


    }

  }
}

export default jQueryRenderer;