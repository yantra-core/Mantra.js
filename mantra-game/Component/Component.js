// Component.js class
// // Setting a nested value
// graphicsComponent.set(['entity1', 'systemA'], { x: 100, y: 200 });
class Component {
  constructor(name) {
    this.name = name;
    this.data = {};
  }

  set(key, value) {
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
  }
}

export default Component;
