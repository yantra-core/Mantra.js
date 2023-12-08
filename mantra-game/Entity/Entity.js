// Entity.js
class Entity {
    constructor(id) {
      this.id = id;
      this.components = {};
    }
    getTimer(name) {
      return this.timers[name];
    }
 
  }
  
  export default Entity;
  