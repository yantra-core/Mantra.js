import Collisions from '../../collisions/Collisions.js';

export default function initEngine() {
  let Matter = this.Matter;
  let game = this.game;
  this.engine = Matter.Engine.create()
  // game.systemsManager.addSystem('physics', this);

  // TODO: register system
  if (typeof game.config.gravity === 'undefined') {
    game.config.gravity = { x: 0, y: 0 };
  }

  if (typeof game.config.gravity.x === 'undefined') {
    game.config.gravity.x = 0;
  }

  if (typeof game.config.gravity.y === 'undefined') {
    game.config.gravity.y = 0;
  }

  this.engine.gravity.x = game.config.gravity.x;
  this.engine.gravity.y = game.config.gravity.y;
  this.world = this.engine.world;

  game.physics = this;
  game.engine = this.engine;
  game.world = this.world;

  this.game = game;

  game.physicsReady = true;

  // should this be onAfterUpdate? since we are serializing the state of the world?
  // i would assume we want that data *after* the update?
  let that = this;

  Matter.Events.on(this.engine, 'afterUpdate', function(event){
    that.onAfterUpdate(that.engine, that.game);
  });

  //this.onAfterUpdate(this.engine, this.onAfterUpdate);

  // TODO: configurable collision plugins
  game.use(new Collisions());
  
}