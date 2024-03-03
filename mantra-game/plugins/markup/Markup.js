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

        if (typeof ent[entityType] !== 'function') {
          console.warn("Markup parsed an unknown tag type, using default instead. tag type:", entityType)
        } else {
          ent[entityType](ent.config);
          console.log('ENT IS NOW', ent.config.type, ent.config)
        }
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

    //
    // Physics Body
    //
    const isStatic = entity.getAttribute('data-is-static') === 'true';
    if (isStatic) {
      ent.isStatic(true); // default Entity.isStatic is false
    }

    //
    // Events
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

    ent.pointerdown(function () {
      // TODO: check ECS pointerevents, was seeing a double event, could have been test env
      // TODO: switch to window or scoped object instead of eval
      pointerdown && eval(pointerdown);
    });

    ent.collisionStart(function (a, b, pair, context) {
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

    //
    // Special case, container children
    //
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

    //
    // TODO: Check to see if the entity has any children that are also of type m-*
    // If so, assume inheritance build the children as config only, merge to meta
    //
    // Iterate over all immediate children of the entity
    // do not perform this logic for CONTAINER elements
    /*
    if (entity.tagName.toLowerCase() !== 'm-container') {
      Array.from(entity.children).forEach(child => {
        // Check if the child's tag name starts with 'm-'
        if (child.tagName.toLowerCase().startsWith('m-')) {
          // Initialize childMeta if it hasn't been already
          //let childMeta = ent.meta() || {}; // Assuming ent.meta() gets or sets metadata
          let childEnt = this.game.make();
          let childType = child.tagName.toLowerCase().slice(2); // Remove 'm-' prefix
          // uppercased first letter
          childType = childType.charAt(0).toUpperCase() + childType.slice(1);
          console.log('childType', childType)
          childEnt[childType]();
          let childName = child.getAttribute('data-name');
          if (childName) {
            // Extract the specific type of the child, without the 'm-' prefix
            if (typeof childEnt[childType] === 'function') {
              // Call the function corresponding to the childType on childEnt
              // Recursively build the entity for the child
              //this.buildEntity(childEnt, child);
              // Merge the child's metadata into childMeta
              //childMeta[childName] = childEnt;
            }
          }
          let pluginId = ent.config.type.toLowerCase().replace('_', '-');
          if (ent.config.type && this.game.systems[pluginId]) {
            let builderInputProperty = this.game.systems[pluginId].builderInputProperty || null;
            if (builderInputProperty) {
              let _meta = {};
              this.buildEntity(childEnt, child)
              _meta[builderInputProperty] = childEnt.config;
              console.log('about to merge in', _meta)
              console.log('to this config', ent.config)
              ent.meta(_meta);
              console.log('resulting config', ent.config)
            } else {
              ent.meta(childEnt);
            }
  
          } else {
            ent.meta(childEnt);

          }
        }
      });
  
    }
      */



    // Repeat / Clone
    if (repeat > 1) {
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

  generateMarkup() {
    let markup = '';

    let entities = this.game.data.ents._;

    Object.keys(entities).forEach(eId => {
      let entity = entities[eId];
      // Start the tag based on the entity type
      markup += `<m-${entity.type.toLowerCase().replace('_', '-')}`;

      // position is always defined with x y z
      markup += ` data-x="${entity.position.x}" data-y="${entity.position.y}"`;
      if (entity.position.z !== undefined) markup += ` data-z="${entity.position.z}"`;

      // Add data attributes based on entity properties
      if (entity.isStatic !== undefined) markup += ` data-is-static="${entity.isStatic}"`;
      if (entity.x !== undefined) markup += ` data-x="${entity.x}"`;
      if (entity.y !== undefined) markup += ` data-y="${entity.y}"`;
      if (entity.width !== undefined) markup += ` data-width="${entity.width}"`;
      if (entity.height !== undefined) markup += ` data-height="${entity.height}"`;
      if (entity.texture !== undefined) markup += ` data-texture="${JSON.stringify(entity.texture)}"`;
      if (entity.name !== undefined) markup += ` data-name="${entity.name}"`;
      if (entity.layout !== undefined) markup += ` data-layout="${entity.layout}"`;
      if (entity.origin !== undefined) markup += ` data-origin="${entity.origin}"`;
      if (entity.repeat !== undefined) markup += ` data-repeat="${entity.repeat}"`;

      // Close the opening tag
      markup += '>';

      // Handle nested entities, if any
      if (entity.children && entity.children.length > 0) {
        markup += generateMarkup(entity.children); // Recursive call for children
      }

      // Close the tag
      markup += `</m-${entity.type.toLowerCase().replace('_', '-')}>\n`;
    });

    return markup;
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