class MemoryBackend {
  constructor() {
    this.data = {};
  }

  clear() {
    this.data = {};
  }

  setItem(key, value) {
    this.data[key] = value;
  }

  getItem(key) {
    return this.data[key] || null;
  }

  removeItem(key) {
    delete this.data[key];
  }

  key(index) {
    return Object.keys(this.data)[index] || null;
  }

  get length() {
    return Object.keys(this.data).length;
  }
}

export default MemoryBackend;