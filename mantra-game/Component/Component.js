// Component.js class
// // Setting a nested value
// graphicsComponent.set(['entity1', 'systemA'], { x: 100, y: 200 });
class Component {
  constructor(name, game) {
    this.name = name;
    this.data = {};
    this.game = game;
  }

  set(key, value) {
    const entityId = Array.isArray(key) ? key[0] : key;

    if (Array.isArray(key)) {
      // Ensure nested structure exists
      let current = this.data;
      for (let i = 0; i < key.length - 1; i++) {
        if (!current[key[i]]) {
          current[key[i]] = {};
        }
        current = current[key[i]];
      }
      current[key[key.length - 1]] = value;
    } else {
      this.data[key] = value;
    }

    // After setting the value, update the corresponding entity in the game.entities
    if (this.game && this.game.entities && this.game.entities[entityId]) {
      this.game.entities[entityId][this.name] = this.get(entityId);
    }

  }

  get(key) {
    if (Array.isArray(key)) {
      let current = this.data;
      for (let i = 0; i < key.length; i++) {
        if (current[key[i]] === undefined) {
          return null;
        }
        current = current[key[i]];
      }
      return current;
    }
    return this.data[key] || null;
  }

  remove(key) {
    if (Array.isArray(key)) {
      let current = this.data;
      for (let i = 0; i < key.length - 1; i++) {
        if (current[key[i]] === undefined) {
          return;
        }
        current = current[key[i]];
      }
      delete current[key[key.length - 1]];
    } else {
      delete this.data[key];
    }


    // After removing the component data, update the entity in game.entities if necessary
    const entityId = Array.isArray(key) ? key[0] : key;
    if (this.game && this.game.entities && this.game.entities[entityId]) {
      delete this.game.entities[entityId][this.name];
    }
  }
}

export default Component;
