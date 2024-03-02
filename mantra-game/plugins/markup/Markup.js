// Markup.js - Marak Squires 2023
export default class Markup {
  static id = 'markup';
  constructor() {
    this.containerCount = 0; // Moved containerCount into the class scope
    this.id = Markup.id;
    this.originalHTML = '';
  }

  init (game) {
    this.game = game;
    //this.initializeGame();
    this.saveOriginalHTML();
    this.game.systemsManager.addSystem(Markup.id, this);
  }

  removeAllCustomElements(game) {
    // Use the systems map keys directly to construct tag names for custom elements
    const systemsTags = Array.from(Object.keys(game.systems)).map(systemName => `m-${systemName.toLowerCase()}`);
    const entities = document.querySelectorAll(systemsTags.join(','));
    entities.forEach(entity => entity.remove());
  }
  
  defineCustomElements(game) {
    game.plugins.forEach(pluginName => {
      const tagName = `m-${pluginName.toLowerCase()}`;
      if (!customElements.get(tagName)) { // Prevent redefining existing custom elements
        class CustomElement extends HTMLElement {
          constructor() {
            super();
          }
        }
        customElements.define(tagName, CustomElement);
      }
    });
  }

  parseCustomDomElements(game) {
    console.log('Parsing custom DOM elements...', game);
    let systems = game.systemsManager.systems;
    // systems is map, we need to iterate over the values
    let that = this;
    function processSystem(system) {
      const tagName = `m-${system.id.toLowerCase()}`;
      const entities = document.querySelectorAll(tagName);
      entities.forEach(entity => {
        let entityType = system.constructor.name;
        console.log('eeee', entityType, entity)
        const ent = game.make();
        ent[entityType]();
        that.buildEntity(ent, entity);
      });

    }

    for (let system of systems.values()) {
      console.log('system', system)
      processSystem(game.systems.container);
      processSystem(system);
    }
    console.log('All entities created.');
  }

  parseDl(dl, parentObject) {
    let dts = dl.querySelectorAll('dt');
    let dds = dl.querySelectorAll('dd');
    dts.forEach((dt, index) => {
      let key = dt.textContent.trim();
      let dd = dds[index];
      let nestedDl = dd.querySelector('dl');
      if (nestedDl) {
        let nestedObject = {};
        this.parseDl(nestedDl, nestedObject);
        parentObject[key] = nestedObject;
      } else {
        parentObject[key] = dd.textContent.trim();
      }
    });
  }

  buildEntity(ent, entity) {
    const width = parseInt(entity.getAttribute('data-width'), 10) || 16;
    const height = parseInt(entity.getAttribute('data-height'), 10) || 16;
    const x = parseInt(entity.getAttribute('data-x'), 10) || 0;
    const y = parseInt(entity.getAttribute('data-y'), 10) || 0;
    const repeat = parseInt(entity.getAttribute('data-repeat'), 10) || 1;
    ent.x(x).y(y).z(10).width(width).height(height);

    let dls = entity.querySelectorAll('dl');
    if (dls.length > 0) {
      let meta = {};
      dls.forEach(dl => this.parseDl(dl, meta));
      console.log('Assigning meta:', meta);
      ent.meta(meta);
    }

    if (entity.tagName.toLowerCase() === 'm-container') {
      let containerName = entity.getAttribute('data-name');
      this.containerCount++;
      ent.name(containerName);
    }

    let parentContainer = entity.closest('m-container');
    if (parentContainer) {
      let parentContainerName = parentContainer.getAttribute('data-name');
      if (parentContainerName) {
        ent.container(parentContainerName);
      }
    }

    if (repeat > 1) {
      ent.repeat(repeat);
    }

    ent.createEntity();
  }

  setPositionsFromDataAttributes() {
    let game = this.game;
    // Iterate over the keys of the systems object
    Object.keys(game.systems).forEach(systemName => {
      const tagName = `m-${systemName.toLowerCase()}`;
      const entities = document.querySelectorAll(tagName);
      console.log('align')
      entities.forEach(entity => {
        let x = parseInt(entity.getAttribute('data-x') || 0, 10) + window.innerWidth / 2;
        let y = parseInt(entity.getAttribute('data-y') || 0, 10) + window.innerHeight / 2;
        entity.style.position = 'absolute';
        entity.style.left = `${x}px`;
        entity.style.top = `${y}px`;
      });
    });
  }
  

  saveOriginalHTML() {
    this.originalHTML = document.body.innerHTML;
  }

  displayOrignalHTMLInPreTag() {
    const pre = document.createElement('pre');
    pre.textContent = this.originalHTML;
    document.body.appendChild(pre);
  }

  parseHTML() {
    let game = this.game;
    this.defineCustomElements(game);
    this.parseCustomDomElements(game);
    this.removeAllCustomElements(game);

    this.displayOrignalHTMLInPreTag();

  }
}