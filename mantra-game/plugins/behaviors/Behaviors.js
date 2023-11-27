// Behaviors.js - Marak Squires 2023
class Behaviors {

  static id = 'behaviors';

  constructor(config = {}) {
    this.id = Behaviors.id;
  }

  init(game) {
    this.game = game;
    // register behaviors as system
    game.systemsManager.addSystem(this.id, this);
  }

  // Behavior Methods
  approach(target) {
    // Logic for approaching a target
  }

  evade() {
    // Logic for evading or dodging
  }

  investigate(area) {
    // Logic for investigating an area or object
  }

  idle() {
    // Logic for idle behavior
  }

  flee() {
    // Logic for fleeing from danger
  }

  pursue(target) {
    // Logic for pursuing a target
  }

  defend(target) {
    // Logic for defending or guarding
  }

  attack(target) {
    // Logic for attacking
  }

  patrol(path) {
    // Logic for patrolling a set path
  }

  interact(object) {
    // Logic for interacting with objects or characters
  }

  search(target) {
    // Logic for searching for something or someone
  }

  alert(signal) {
    // Logic for reacting to alerts
  }

  useAbility(ability) {
    // Logic for using a special skill or ability
  }

  communicate(message) {
    // Logic for engaging in dialogue or signaling
  }

  follow(target) {
    // Logic for following another character or entity
  }

  gather(resources) {
    // Logic for gathering resources or items
  }

  rest() {
    // Logic for resting or healing
  }

  wander() {
    // Logic for wandering or exploring randomly
  }
  
}

export default Behaviors;
