// CSSGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import inflateBox from './lib/inflateBox.js';
import inflateText from './lib/inflateText.js';

class CSSGraphics extends GraphicsInterface {

  static id = 'graphics-css';
  static removable = false;

  constructor({ camera } = {}) {
    super();

    if (typeof camera === 'string') {
      // legacy API, remove in future
      camera = {
        follow: true
      }
    }

    // config scope for convenience
    let config = {
      camera
    };
    this.config = config;

    this.id = CSSGraphics.id;
    this.cameraPosition = { x: 0, y: 0 };

    this.inflateBox = inflateBox.bind(this);
    this.inflateText = inflateText.bind(this);

    this.depthChart = [
      'background',
      'border',
      'wire',
      'PART',
      'TEXT',
      'PLAYER',
      'BLOCK'
    ];

    // this.depthChart = this.depthChart.reverse();

  }

  init(game) {
    // register renderer with graphics pipeline
    game.graphics.push(this);
    game.zoomScale = 1;
    this.game = game;

    game.on('entityInput::handleInputs', (entityId, data, sequenceNumber) => {
      if (data) {
        let currentInputs = data.controls;


        if (game.tick % 5 !== 0) {
          return;
        }
        // check to see if we have a player entity
        let playerEntity = game.getEntity(entityId);
        if (!playerEntity) {
          return;
        }
        let graphic = playerEntity.graphics['graphics-css'];
        if (!graphic) {
          return;
        }

        let direction = 'right';
        if (currentInputs) {
          if (currentInputs.W) {
            direction = 'up';
          } else if (currentInputs.A) {
            direction = 'left';
          } else if (currentInputs.S) {
            direction = 'down';
          } else if (currentInputs.D) {
            direction = 'right';
          }
          // Assume there's a way to determine whether to use -0 or -1 suffix
          // For simplicity, let's alternate between -0 and -1

          // get current className from graphic
          let spriteClass = graphic.className;

          // check it spriteClass has "0" in it
          let spriteNumber = spriteClass.indexOf('0') > -1 ? 1 : 0;


          // let spriteNumber = Math.round(Math.random()); // Randomly choose 0 or 1
          //let spriteNumber = playerEntity.bit;
          spriteClass = `guy-${direction}-${spriteNumber}`;

          // First, clear previous sprite classes if any
          graphic.classList.remove('guy-down-0', 'guy-down-1', 'guy-up-0', 'guy-up-1', 'guy-right-0', 'guy-right-1', 'guy-left-0', 'guy-left-1');

          // Add the new sprite class
          graphic.classList.add(spriteClass);

        }

      }
    });

    // let the graphics pipeline know the document is ready ( we could add document event listener here )
    // Remark: CSSGraphics current requires no async external loading scripts

    // Initialize the CSS render div
    this.initCSSRenderDiv();


    // register renderer with graphics pipeline
    game.graphics.push(this);

    this.game.systemsManager.addSystem('graphics-css', this);

    // is sync load; however we still need to let the graphics pipeline know we are ready
    game.emit('plugin::ready::graphics-css', this);

    // TODO: remove this line from plugin implementations
    game.loadingPluginsCount--;

    // Add event listener for mouse wheel
    document.addEventListener('wheel', this.cssMouseWheelZoom, { passive: false });

  }

  cssMouseWheelZoom(event) {

    let game = this.game;
    let scale = game.zoomScale;
    // Game viewport
    let gameViewport = document.getElementById('gameHolder');


    // Zoom settings
    const zoomSettings = {
      intensity: 0.01, // Decreased zoom intensity for smoother zoom
      minScale: 0.1,   // Minimum scale limit
    };

    // Function to update scale
    // Prevent default scrolling behavior
    event.preventDefault();

    // Determine zoom direction
    const delta = event.wheelDelta ? event.wheelDelta : -event.detail;
    const direction = delta > 0 ? 1 : -1;

    // Update scale
    scale += direction * zoomSettings.intensity;
    scale = Math.max(zoomSettings.minScale, scale); // Prevent zooming out too much

    // Apply scale to viewport
    gameViewport.style.transform = `scale(${scale})`;

    game.zoomScale = scale;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    // TODO: implement offset to ensure camera is center of screen after zoom
    // gameViewport.style.transform = `translate(${-this.cameraPosition.x}px, ${-this.cameraPosition.y}px) scale(${scale})`;

    //game.viewportCenterXOffset = (viewportCenterX) / scale;
    //game.viewportCenterYOffset = (viewportCenterY) / scale;

  }

  initCSSRenderDiv() {

    // Ensure the gameHolder div exists
    // Remark: This is handled by `Graphics.js`; however in async loading with no priority
    // It is currently possible that CSSGraphics will load before Graphics does, so we need this check
    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
    }

    let renderDiv = document.getElementById('css-render-div');
    if (!renderDiv) {
      renderDiv = document.createElement('div');
      renderDiv.id = 'css-render-div';
      renderDiv.className = 'render-div';
      gameHolder.appendChild(renderDiv);
    }

    this.renderDiv = renderDiv;
  }

  createGraphic(entityData) {

    if (entityData.destroyed === true) {
      // ignore, shouldn't have made it here, check upstream as well
      return;
    }
    let entityElement = document.createElement('div');
    entityElement.id = `entity-${entityData.id}`;

    // set data-id to entity id
    entityElement.setAttribute('mantra-id', entityData.id);

    entityElement.className = 'entity-element';
    entityElement.style.position = 'absolute';


    if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
      if (typeof entityData.rotation === 'object') {
        // transform 3d to 2.5d
        entityData.rotation = entityData.rotation.x; // might not be best to mutate entityData
      } else {
        entityData.rotation = entityData.rotation;
      }
    }

    switch (entityData.type) {
      case 'BULLET':
        // For BULLET entities, create a circle
        const radius = entityData.radius || 0;
        entityElement.style.width = (radius * 2) + 'px';
        entityElement.style.height = (radius * 2) + 'px';
        entityElement.style.borderRadius = '50%';  // This will make the div a circle
        entityElement.style.background = 'red';

        break;
      case 'PLAYER':
        // For PLAYER entities, create a triangle
        entityElement.style.width = entityData.width + 'px';
        entityElement.style.height = entityData.height + 'px';
        //entityElement.style.borderLeft = entityData.width / 2 + 'px solid white';
        //entityElement.style.borderRight = entityData.width / 2 + 'px solid white';
        //entityElement.style.borderBottom = entityData.height + 'px solid green';
        // entityElement.classList.add('pixelart-to-css');

        /*

        we have: 

        .guy-down-0
        .guy-down-1
        .guy-up-0
        .guy-up-1
        .guy-right-0
        .guy-right-1

        */

        entityElement.classList.add('guy-right-0');


        break;
      case 'TEXT':
        entityElement = this.inflateText(entityElement, entityData);
        break;
      default:
        this.inflateBox(entityElement, entityData);
        break;
    }

    this.renderDiv.appendChild(entityElement);

    // Update the position of the entity element
    this.updateEntityElementPosition(entityElement, entityData);
    return entityElement;
  }

  updateGraphic(entityData) {

    // TODO: move this to common 3D-2.5D transform function(s)
    if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
      if (typeof entityData.rotation === 'object') {
        // transform 3d to 2.5d
        entityData.rotation = entityData.rotation.x; // might not be best to mutate entityData
      } else {
        entityData.rotation = entityData.rotation;
      }
    }

    const entityElement = document.getElementById(`entity-${entityData.id}`);
    if (entityElement) {

      // Update the entity color
      if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
        // entityData.color is int number here we need a hex
        let hexColor = '#' + entityData.color.toString(16);
        // update the background color
        entityElement.style.background = hexColor;
      }
      // Update the background sprite if velocity is present
      /*
      if (entityData.type === 'PLAYER' && entityData.velocity && this.game.tick % 10 === 0 && Math.abs(entityData.velocity.x) > 0.001 && Math.abs(entityData.velocity.y) > 0.001) {

        let angle = Math.atan2(entityData.velocity.y, entityData.velocity.x);
        let angleDeg = angle * 180 / Math.PI;

        // Remark: Move this logic to just listen for local entityInput
        // we can revist this for server side prediction later
        // Determine direction based on angle
        let direction = "";
        if (angleDeg >= -45 && angleDeg < 45) {
          direction = "right";
        } else if (angleDeg >= 45 && angleDeg < 135) {
          direction = "down";
        } else if (angleDeg >= -135 && angleDeg < -45) {
          direction = "up";
        } else {
          direction = "left";
        }

        // Assume there's a way to determine whether to use -0 or -1 suffix
        // For simplicity, let's alternate between -0 and -1
        let spriteNumber = Math.round(Math.random()); // Randomly choose 0 or 1
        let spriteClass = `guy-${direction}-${spriteNumber}`;

        // First, clear previous sprite classes if any
        entityElement.classList.remove('guy-down-0', 'guy-down-1', 'guy-up-0', 'guy-up-1', 'guy-right-0', 'guy-right-1', 'guy-left-0', 'guy-left-1');

        // Add the new sprite class
        entityElement.classList.add(spriteClass);

        //console.log('Entity data:', entityData);
        //console.log('Applied class:', spriteClass);
      }
      */

      // Update the position of the entity element
      return this.updateEntityElementPosition(entityElement, entityData);
    } else {
      // If the entity element does not exist, create it
      return this.createGraphic(entityData);
    }
  }

  removeGraphic(entityId) {

    let entity = this.game.getEntity(entityId);

    if (!entity || !entity.graphics || !entity.graphics['graphics-css']) {
      return;
    }

    let renderDiv = document.getElementById('css-render-div');
    if (renderDiv && renderDiv.contains(entity.graphics['graphics-css'])) {
      entity.graphics['graphics-css'].remove();
    }

  }

  updateEntityElementPosition(entityElement, { position, width, height, rotation = 0 }) {
    // Adjust the position based on the camera position
    const adjustedPosition = {
      x: position.x - this.cameraPosition.x + window.outerWidth / 2,
      y: position.y - this.cameraPosition.y + window.outerHeight / 2
    };

    const domX = adjustedPosition.x - width / 2;
    const domY = adjustedPosition.y - height / 2;

    // convert rotation to degrees
    let angle = rotation * (180 / Math.PI);

    this.setTransform(entityElement, domX, domY, rotation, angle);

    return entityElement;
  }

  setTransform(entityElement, domX, domY, rotation, angle) {
    // Retrieve the last rotation value, default to 0 if not set
    let lastRotation = entityElement.dataset.rotation || 0;
    // Update rotation if provided
    if (rotation) {
      lastRotation = angle;
      entityElement.dataset.rotation = angle;
    }

    // Update the transform property
    entityElement.style.transform = `translate(${domX}px, ${domY}px) rotate(${lastRotation}deg)`;
  }
  update() {
    let game = this.game;

    if (typeof game.viewportCenterXOffset === 'undefined') {
      game.viewportCenterXOffset = 0;
    }

    if (typeof game.viewportCenterYOffset === 'undefined') {
      game.viewportCenterYOffset = 0;
    }

    const currentPlayer = this.game.getEntity(game.currentPlayerId);
    if (this.config.camera && this.config.camera.follow && currentPlayer) {
      if (currentPlayer.position) {
        this.cameraPosition.x = currentPlayer.position.x - game.viewportCenterXOffset;
        this.cameraPosition.y = currentPlayer.position.y - game.viewportCenterYOffset;
      }
    }
  }

  render(game, alpha) {
    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      this.inflateEntity(ent, alpha);
      if (ent.pendingRender && ent.pendingRender['graphics-css']) {
        ent.pendingRender['graphics-css'] = false;
      }
    }
  }

  inflateEntity(entity, alpha) {

    // checks for existence of entity, performs update or create
    if (entity.graphics && entity.graphics['graphics-css']) {
      let graphic = entity.graphics['graphics-css'];
      this.updateGraphic(entity, alpha);

    } else {
      let graphic = this.createGraphic(entity);
      this.game.components.graphics.set([entity.id, 'graphics-css'], graphic);

    }
  }

  unload() {

    // TODO: consolidate graphics pipeline unloading into SystemsManager
    // TODO: remove duplicated unload() code in BabylonGraphics
    this.game.graphics = this.game.graphics.filter(g => g.id !== this.id);
    delete this.game._plugins['CSSGraphics'];

    // remove the wheel event listener
    document.removeEventListener('wheel', this.cssMouseWheelZoom);

    // iterate through all entities and remove existing css graphics
    for (let [eId, entity] of this.game.entities.entries()) {
      if (entity.graphics && entity.graphics['graphics-css']) {
        this.removeGraphic(eId);
        delete entity.graphics['graphics-css'];
      }
    }

    let div = document.getElementById('css-render-canvas');
    if (div) {
      div.remove();
    }
  }
}

export default CSSGraphics;
