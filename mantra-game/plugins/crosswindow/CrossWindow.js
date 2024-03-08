// CrossWindow.js - Mantra Plugin - Marak Squires 2024
// see: CrossWindow.js: https://github.com/yantra-core/CrossWindow.js

// import { CrossWindow as CW, CrossWindowDebugger } from '../../../../CrossWindow.js/index.js'
import { CrossWindow as CW, CrossWindowDebugger } from 'crosswindow';

export default class CrossWindow {
  static id = 'crosswindow';
  constructor(game) {
    this.id = CrossWindow.id;
    this.crosswindow = null;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(CrossWindow.id, this);

    //console.log('CrossWindow plugin initialized', CrossWindow);
    // Initialize CrossWindow instance
    this.crosswindow = new CW(window, {
      broadcastMouseEvents: true,
      broadcastKeyboardEvents: true,
    });

    // Optionally initialize CrossWindow debugger
    this.crossWindowDebugger = new CrossWindowDebugger(this.crosswindow, {
      showOtherWindows: true,
      showWindowLegend: true,
      showWindowCount: true,
    });

    // Listen for Mantra and CrossWindow events
    this.setupListeners();
  }

  setupListeners() {
    // Mantra event listener for entity exiting viewport
    this.game.on('entity::exited::viewport', this.handleEntityExit.bind(this));

    // CrossWindow message listener
    this.crosswindow.on('message', this.handleMessage.bind(this));
  }

  // Function to assemble data about an entity, omitting functions and specific properties
  assembleEntityData(entity, actualItems) {
    const entityData = { ...entity };

    // Removing function properties and the 'graphics' property
    Object.keys(entityData).forEach(key => {
      if (typeof entityData[key] === 'function' || key === 'graphics') {
        delete entityData[key];
      }
    });

    // Setting default friction values
    Object.assign(entityData, {
      screenPosition: entity.screenPosition,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0
    });

    return entityData;
  }

  // Main logic for handling an entity exiting the viewport
  handleEntityExit(entity) {
    let game = this.game;
    //console.log('handleEntityExithandleEntityExit entityentityentityentity', entity)
    let entityData = this.assembleEntityData(entity);
    //console.log("entityDataentityData", entityData)
    const bestWindow = this.crosswindow.getBestWindow(entityData, game.data.camera.currentZoom);
    //console.log('handleEntityExit', entityData, bestWindow)
    if (bestWindow) {
      if (bestWindow.windowId === this.crosswindow.windowId) {
        // If the best window is the current window, update its position without messaging
        const position = { ...bestWindow.entryPosition };
        entityData.position = position;
        this.ensuresEntityInViewport(entityData, 50); // Ensure the entity is within the viewport
        game.setPosition(entity.id, position);
      } else {
        // If the best window is a different window, remove the entity and send a message
        game.removeEntity(entity.id);
        entityData.action = 'message'; // TODO: fix this and add 'action' and 'payload' top-level scope to CrossWindow
        delete entityData.sutra; // for now
        bestWindow.postMessage(entityData);
      }
    } else {
      console.warn('No best window found for entity');
    }
  }

  // Example usage: handleEntityExit(entity, gameInstance, crosswindowInstance);

  handleMessage(event) {
    // console.log('handleMessagehandleMessage', event)
    const data = event; // TODO: fix this in CrossWindow, add top-level scope of "action" and "payload"
    if (!data) return;

    // Focus the current window to ensure user attention
    window.focus();
    switch (event.action) {
      case 'intersecting':
        // Handle intersecting windows if necessary
        break;
      case 'message':
        this.ensuresEntityInViewport(data); // Ensure the entity is within viewport bounds

        if (data.type === 'PLAYER') {
          // Specific logic for player entities, e.g., setPlayerId, updateEntity, etc.
          // TODO: better global tracking of data cross windows via local storage
          // Remark: might be better suited as separate namespace from CrossWindow localstorage
          // Could use LocalStorage plugin for Mantra, etc
          // this.game.setPlayerId(data.id);
          localStorage.setItem('mantra-currentPlayer', JSON.stringify({ x: data.position.x + window.screenX, y: data.position.y + window.screenY }));
        }

        let entity = data; // remove this
        let entityData = {
          id: entity.id,
          type: entity.type,
          health: entity.health,
          position: entity.position,
          rotation: entity.rotation,
          // velocity: entity.velocity,
          rotation: entity.rotation,
          meta: entity.meta,
          // items: actualItems, // TODO: items merge with source map
          size: entity.size,
          body: entity.body,
          mass: entity.mass,
          color: entity.color,
          source: entity.source,
          // etc, all props, iterate? mantra helper?
        };

        
        for (let p in entity) {
          if (typeof entity[p] !== 'function' && p !== 'graphics') {
            entityData[p] = entity[p];
          }
        }
        entityData.screenPosition = entity.screenPosition;
        // TODO: friction isn't a component property in mantra, its subset of body
        entityData.friction = 0;
        entityData.frictionAir = 0;
        entityData.frictionStatic = 0;
        entityData.source = this.crosswindow.windowId;

        delete entityData.sutra; // for now, we can toJSON this and re-inflate it
        // console.log('sendingdata', entityData)
        // Inflate or update entity in the game
        let ent = this.game.inflateEntity(entityData);
        if (ent.type === 'PLAYER') {
          this.game.setPlayerId(ent.id); // for now
        }
        break;
      default:
        console.warn('Unhandled message action:', data.action);
    }
  }

  ensuresEntityInViewport(entityData, buffer = 50) {
    // console.log('ensuresEntityInViewport', entityData)

    let result = game.systems['graphics-css'].isEntityInViewport(entityData, game.data.camera.currentZoom);

    if (!result.inViewport) {

      // clamp the values
      // console.log('before adjustement', entityData.position.x, entityData.position.y)
      if (result.outsideOf.left) {
        entityData.position.x = -window.innerWidth / 2 / game.data.camera.currentZoom;
        entityData.position.x += buffer;
      }
      if (result.outsideOf.right) {
        entityData.position.x = window.innerWidth / 2 / game.data.camera.currentZoom;
        entityData.position.x -= buffer;
      }
      if (result.outsideOf.top) {
        entityData.position.y = -window.innerHeight / 2 / game.data.camera.currentZoom;
        entityData.position.y += buffer;
      }
      if (result.outsideOf.bottom) {
        entityData.position.y = window.innerHeight / 2 / game.data.camera.currentZoom;
        entityData.position.y -= buffer;
      }

      // console.log('after adjustement', entityData.position.x, entityData.position.y)

    }

  }
}