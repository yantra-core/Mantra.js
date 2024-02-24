// Teleporter.js - Marak Squires 2024
export default class Teleporter {
  static id = 'teleporter';
  constructor(config = {}) {
    this.id = Teleporter.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('teleporter', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    entityData.destination = entityData.destination || {
      position: {
        x: 0,
        y: 0,
        z: 0
      }
    };

    if (typeof entityData.url !== 'undefined') {
      entityData.destination.url = entityData.url;
    }

    //
    // Click to teleport
    //
    if (entityData.clickToTeleport !== false) { // default behavior is true, click to teleport
      entityData.pointerdown = entityData.pointerdown || this.pointerdownWrap.bind(this)
    }
    let style = {};
    if (entityData.clickToTeleport !== false) {
      style = {
        cursor: 'pointer'
      };
    }

    return {
      type: 'TELEPORTER',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'ayyoDoor',
        // frame: 0 // TODO: support single frame / bypass animation of array
      },
      meta: {
        destination: entityData.destination
      },
      //texture: 'teleporter',
      //color: 0xff0000,
      pointerdown: entityData.pointerdown || this.pointerdownWrap.bind(this),
      collisionStart: entityData.collisionStart || this.touchedTeleporter.bind(this),
      style: style,
      size: {
        width: 16,
        height: 16,
        depth: 16,
      },
      isStatic: true,
      position: {
        x: 0,
        y: 0,
        z: 1
      }
    };
  }

  createEntity(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    // Create the Teleporter entity
    const teleporter = game.createEntity(this.build(entityData));
  }

  // TODO: unified function signature for mantra pointer events and collision events
  pointerdownWrap (context, event) {
    // teleport expects a Collision.js event, not a pointer event
    // TODO: refactor to use a single event signature
    // NOTE: swap owner and target, since the owner of pointer event is probably Player, not Teleporter 
    this.touchedTeleporter(null, null, event, {
      target: context.owner, // owner from pointerdown is the owner of the event ( usually Player )
      owner: context.target, // target from pointerdown is the target of the event ( usually what was clicked on )
      event: event
    });
  }

  // TODO: Unifiy context signature from collisions
  // TODO: map context.buttons.LEFT against entityData.clickToTeleport existence
  //       in order to enable only left click to teleport, not other pointer downs
  touchedTeleporter(a, b, pair, context) {
    let game = this.game;
    if (context.owner.meta && context.owner.meta.destination) {
      let destination = context.owner.meta.destination;
      if (typeof destination === 'function') { // remark why the if/else here? refactor
        destination.call(game, context.target, context.owner);
      } else {
        if (typeof destination.url !== 'undefined') {

          if (context.target.type === 'PLAYER') { // could be other types as well
            // this page is inside an iframe, change the parent url to this url
            // Remark: we'll want to make this behavior configurable
            // Some users may wish for their embeds to not update parent window by default
            if (window.parent !== window) {
              window.parent.location = destination.url;
              return;
            }
            // redirect the entire page to this url
            window.location = destination.url;
          }
          return;
        }

        if (typeof destination.world !== 'undefined') {
          if (context.target.type === 'PLAYER') { // could be other types as well
            game.switchWorlds(destination.world);
          }
        }
        // same as world, duplicate code
        if (typeof destination.plugin !== 'undefined') {
          if (context.target.type === 'PLAYER') { // could be other types as well
            game.switchWorlds(destination.plugin);
          }
        }
        // handle entity case
        if (typeof destination.entity !== 'undefined') {
          // get latest position for ent ( if available )
          let ent = game.data.ents._[destination.entity]; // TODO: game.getEntity() with improved perf
          if (ent) {
            game.setPosition(context.target.id, { x: ent.position.x, y: ent.position.y });
          }
        }
        if (typeof destination.position !== 'undefined') {
          game.setPosition(context.target.id, { x: destination.position.x, y: destination.position.y });
        }
      }
    }

  }

}