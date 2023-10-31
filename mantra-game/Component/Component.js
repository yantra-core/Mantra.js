// Component.js
class Component {
  constructor(name) {
    this.name = name;
    this.data = {};
  }

  set(entityId, data) {
    this.data[entityId] = data;
  }

  get(entityId) {
    return this.data[entityId] || null;
  }

  remove(entityId) {
    delete this.data[entityId];
  }
}

export default Component;
