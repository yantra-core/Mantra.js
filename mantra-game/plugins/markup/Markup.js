// Markup.js - Marak Squires 2023
// This Plugin will parse the DOM HTML and create entities based on the markup
// Uses the custom elements API to define custom elements
// Can bind to events on the entity event lifecycle
// collision events / pointer events / entity creation / entity removal
// Remark: Not all events and styles are supported yet
export default class Markup {
  static id = 'markup';
  constructor({
    displayOriginalHTML = false
  } = {}) {
    this.id = Markup.id;
    this.originalHTML = '';
    this.displayOriginalHTML = displayOriginalHTML;
  }

  init(game) {
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

        // Define a safe list of style properties
        const safeStyleProperties = new Set([
          'color',
          'background',
          'fontSize',
          // Shorthand border properties
          'border',
          'border-top',
          'border-right',
          'border-bottom',
          'border-left',
          // Border-width properties
          'border-width',
          'border-top-width',
          'border-right-width',
          'border-bottom-width',
          'border-left-width',
          // Border-style properties
          'border-style',
          'border-top-style',
          'border-right-style',
          'border-bottom-style',
          'border-left-style',
          // Border-color properties
          'border-color',
          'border-top-color',
          'border-right-color',
          'border-bottom-color',
          'border-left-color',
          // Background
          'background-color',
          'background-image',
          'background-repeat',
          'background-position',
          'background-size',
          // Margin and Padding
          'margin',
          'margin-top',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'padding',
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
          // font and font decoration
          'font',
          'font-family',
          'font-size',
          'font-weight',
          'font-style',
          'text-decoration',
          'text-align',
          'text-transform',
          'text-shadow',
          'line-height',
          'letter-spacing',
          'word-spacing',
          'white-space',
          'vertical-align',
          'list-style',
          'list-style-type',
          'list-style-position',
          'list-style-image',
          'cursor',
          'z-index',
          'opacity',
          'visibility',
          'display',
          // Add other relevant style properties here
        ]);

        let styles = window.getComputedStyle(entity);
        let safeStyles = {};
        // Copy only the safe styles
        for (let style of styles) {
          if (safeStyleProperties.has(style)) {
            safeStyles[style] = styles[style];
          }
        }

        let entityType = system.constructor.name;
        const ent = game.make();
        ent[entityType]();
        ent.style(safeStyles);
        that.buildEntity(ent, entity);
      });
    }

    processSystem(game.systems.container);
    for (let system of systems.values()) {
      if (system.id === 'container') continue;
      //console.log('system', system)
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
    const width = parseInt(entity.getAttribute('width'), 10) || 16;
    const height = parseInt(entity.getAttribute('height'), 10) || 16;
    const x = parseInt(entity.getAttribute('data-x'), 10) || 0;
    const y = parseInt(entity.getAttribute('data-y'), 10) || 0;
    const repeat = parseInt(entity.getAttribute('data-repeat'), 10) || 1;
    const texture = entity.getAttribute('data-texture') || null;
    const color = entity.getAttribute('data-color') || null;
    const layout = entity.getAttribute('data-layout') || null;
    const origin = entity.getAttribute('data-origin') || null;
    // TODO: get any pointerdown events bound to the entity
    const pointerdown = entity.getAttribute('onpointerdown') || null;

    // if text element, get the inner HTML
    if (entity.tagName.toLowerCase() === 'm-text') {
      ent.text(entity.innerHTML);
    }

    const collisionStart = entity.getAttribute('data-collision-start') || null;

    ent.x(x).y(y).z(10).width(width).height(height);

    if (texture) {
      ent.texture(texture);
    }

    if (color) {
      ent.color(color);
    }

    if (layout) {
      ent.layout(layout);
    }

    if (origin) {
      ent.origin(origin);
    }

    ent.pointerdown(function(){
      // TODO: check ECS pointerevents, was seeing a double event, could have been test env
      // TODO: switch to window or scoped object instead of eval
      pointerdown && eval(pointerdown);
    });

    ent.collisionStart(function(a, b, pair, context){
      window[collisionStart] && window[collisionStart](a, b, pair, context);
    });

    //entity.removeAttribute('onpointerdown');

    let dls = entity.querySelectorAll('dl');
    if (dls.length > 0) {
      let meta = {};
      dls.forEach(dl => this.parseDl(dl, meta));
      console.log('Assigning meta:', meta);
      ent.meta(meta);
    }

    let containerName = entity.getAttribute('data-name');

    if (containerName) {
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
      console.log("repeat", repeat)
      ent.repeat(repeat);
    }

    ent.createEntity();
  }

  preview() {
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
        //entity.width = parseInt(entity.getAttribute('width'), 10) || 16;
        //entity.height = parseInt(entity.getAttribute('height'), 10) || 16;
      });
    });
    this.displayOrignalHTMLInPreTag();
  }


  saveOriginalHTML() {
    this.originalHTML = document.body.innerHTML;
  }

  displayOrignalHTMLInPreTag() {
    const pre = document.createElement('pre');
    pre.textContent = this.originalHTML;
    document.body.appendChild(pre);
    let gameHolder = document.querySelector('#gameHolder');
    gameHolder.appendChild(pre);
  }

  parseHTML(displayOriginalHTML) {
    let game = this.game;
    this.defineCustomElements(game);
    this.parseCustomDomElements(game);
    this.removeAllCustomElements(game);

    if (displayOriginalHTML || this.displayOriginalHTML) {
      this.displayOrignalHTMLInPreTag();
    }

  }
}