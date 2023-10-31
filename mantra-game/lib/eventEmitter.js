const eventEmitter = {
  listeners: {},
  wrappedFunctions: {}
};

// Utility to check if the given eventName matches the pattern
eventEmitter._isMatch = function _isMatch(pattern, eventName) {
  const regexPattern = pattern
    .split('::')
    .map(part => {
      if (part === '**') return '.*';  // Match any character (including '::')
      if (part === '*') return '[^:]*'; // Match any character except ':'
      return part.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape special characters
    })
    .join('::');
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(eventName);
};


eventEmitter.before = function beforeEvent(eventPattern, callback) {
  if (!eventEmitter.listeners[eventPattern]) {
    eventEmitter.listeners[eventPattern] = [];
  }
  eventEmitter.listeners[eventPattern].unshift(callback);
};

eventEmitter.after = function afterEvent(eventPattern, callback) {
  if (!eventEmitter.listeners[eventPattern]) {
    eventEmitter.listeners[eventPattern] = [];
  }
  eventEmitter.listeners[eventPattern].push(callback);
};

eventEmitter.on = function onEvent(eventPattern, callback) {
  if (!eventEmitter.listeners[eventPattern]) {
    eventEmitter.listeners[eventPattern] = [];
  }
  eventEmitter.listeners[eventPattern].push(callback);
};

eventEmitter.off = function offEvent(eventPattern, callback) {
  Object.keys(eventEmitter.listeners).forEach(pattern => {
    if (this._isMatch(eventPattern, pattern)) {
      eventEmitter.listeners[pattern] = eventEmitter.listeners[pattern].filter(listener => listener !== callback);
    }
  });
};

eventEmitter.emit = function emitEvent(eventName, data) {
  Object.keys(eventEmitter.listeners).forEach(pattern => {
    if (this._isMatch(pattern, eventName)) {
      eventEmitter.listeners[pattern].forEach(listener => {
        try {
          listener.call(null, data);
        } catch (error) {
          console.error(`Error when executing listener for event "${eventName}":`, error);
        }
      });
    }
  });
};

// is this correct? do we need to emit here instead of binding?
// i dont think we care so much about emitting to the class, althuogh we should support it
// being able to emit is super useful for not having to import stuff actually
// game.emit('entity-factory::create', { id: 123, type: 'PLAYER' });
// game.createEntity({ id: 123, type: 'PLAYER' });
// ^^alias game.entityFactor.createEntity({ id: 123, type: 'PLAYER' });
eventEmitter.bindClass = function bindClass(classInstance, namespace) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance));
  methods.forEach(method => {
    if (typeof classInstance[method] === 'function' && method !== 'constructor') {
      const eventName = namespace + '.' + method;
      const wrappedFunction = (...args) => {
        classInstance[method].apply(classInstance, args);
      };
      this.on(eventName, wrappedFunction);

      // Store the wrapped function so we can remove it later
      this.wrappedFunctions[eventName] = wrappedFunction;
    }
  });
};

eventEmitter.unbindClass = function unbindClass(classInstance, namespace) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance));
  methods.forEach(method => {
    if (typeof classInstance[method] === 'function' && method !== 'constructor') {
      const eventName = namespace + '.' + method;
      const wrappedFunction = this.wrappedFunctions[eventName];

      if (wrappedFunction) {
        this.off(eventName, wrappedFunction);
      }
    }
  });
};

export default eventEmitter;