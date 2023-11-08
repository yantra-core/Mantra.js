const eventEmitter = {
  listeners: {},
  wrappedFunctions: {}
};

eventEmitter.anyListeners = [];

eventEmitter.onAny = function onAny(callback) {
  eventEmitter.anyListeners.push(callback);
};

eventEmitter.offAny = function offAny(callback) {
  eventEmitter.anyListeners = eventEmitter.anyListeners.filter(listener => listener !== callback);
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
    if (eventEmitter._isMatch(eventPattern, pattern)) {
      eventEmitter.listeners[pattern] = eventEmitter.listeners[pattern].filter(listener => listener !== callback);
    }
  });
};

eventEmitter.emit = function emitEvent(eventName, ...args) {

  // Call anyListeners
  eventEmitter.anyListeners.forEach(listener => {
    try {
      listener.call(null, eventName, ...args);
    } catch (error) {
      console.error(`Error when executing any listener for event "${eventName}":`, error);
    }
  });

  // Call listeners matching the pattern
  Object.keys(eventEmitter.listeners).forEach(pattern => {
    if (eventEmitter._isMatch(pattern, eventName)) {
      eventEmitter.listeners[pattern].forEach(listener => {
        try {
          listener.apply(null, args);
        } catch (error) {
          console.error(`Error when executing listener for event "${eventName}":`, error);
        }
      });
    }
  });
};

// game.emit('entity-factory::create', { id: 123, type: 'PLAYER' });
// game.createEntity({ id: 123, type: 'PLAYER' });
// ^^alias game.entityFactor.createEntity({ id: 123, type: 'PLAYER' });

eventEmitter.bindClass = function bindClass(classInstance, namespace) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance));
  methods.forEach(method => {
    if (typeof classInstance[method] === 'function' && method !== 'constructor') {
      const eventName = namespace + '::' + method;
      const originalMethod = classInstance[method].bind(classInstance);

      // Store the original method in wrappedFunctions for future reference
      this.wrappedFunctions[eventName] = originalMethod;

      // Set the original method as an event listener
      // TODO: add back this line to pass tests, add failing tests for double emit bug
      // this.on(eventName, this.wrappedFunctions[eventName]);

      // Replace the class method with a wrapper function that emits events
      classInstance[method] = (...args) => {
        // Emit the event
        this.emit(eventName, ...args);
        // Call the original method
        return this.wrappedFunctions[eventName](...args);
      };
    }
  });
};

eventEmitter.unbindClass = function unbindClass(classInstance, namespace) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance));
  methods.forEach(method => {
    if (typeof classInstance[method] === 'function' && method !== 'constructor') {
      const eventName = namespace + '::' + method;
      const wrappedFunction = this.wrappedFunctions[eventName];

      // Remove the event listener if it exists
      if (wrappedFunction) {
        this.off(eventName, wrappedFunction);
        // Restore the original method by removing the wrapper
        classInstance[method] = wrappedFunction;
        // Remove the reference from wrappedFunctions
        delete this.wrappedFunctions[eventName];
      }
    }
  });
};

export default eventEmitter;