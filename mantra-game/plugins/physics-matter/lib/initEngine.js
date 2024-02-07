import Collisions from '../../collisions/Collisions.js';

export default function initEngine() {
  let Matter = this.Matter;
  let game = this.game;
  this.engine = Matter.Engine.create()
  
  this.engine.gravity.x = game.config.gravity.x;
  this.engine.gravity.y = game.config.gravity.y;
  // this.world = this.engine.world;

  game.physicsReady = true;

}