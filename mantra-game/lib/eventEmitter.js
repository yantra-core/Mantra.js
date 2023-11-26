const eventEmitter = {
  listeners: {},
  emitters: {},
  wrappedFunctions: {}
};

eventEmitter.anyListeners = [];

eventEmitter.onAny = function onAny(callback) {
  eventEmitter.anyListeners.push(callback);
};

eventEmitter.offAny = function offAny(callback) {
  eventEmitter.anyListeners = eventEmitter.anyListeners.filter(listener => listener !== callback);
};

eventEmitter.before = function beforeEvent(eventName, callback) {
  if (!eventEmitter.listeners[eventName]) {
    eventEmitter.listeners[eventName] = [];
  }
  eventEmitter.listeners[eventName].unshift(callback);
};

eventEmitter.after = function afterEvent(eventName, callback) {
  if (!eventEmitter.listeners[eventName]) {
    eventEmitter.listeners[eventName] = [];
  }
  eventEmitter.listeners[eventName].push(callback);
};

eventEmitter.once = function onceEvent(eventName, callback) {
  const onceWrapper = (...args) => {
    this.off(eventName, onceWrapper);
    callback.apply(null, args);
  };
  this.on(eventName, onceWrapper);
};

eventEmitter.on = function onEvent(eventName, callback) {
  if (!eventEmitter.listeners[eventName]) {
    eventEmitter.listeners[eventName] = [];
  }
  eventEmitter.listeners[eventName].push(callback);
};

eventEmitter.off = function offEvent(eventName, callback) {
  if (eventEmitter.listeners[eventName]) {
    eventEmitter.listeners[eventName] = eventEmitter.listeners[eventName].filter(listener => listener !== callback);
  }
};

eventEmitter.emit = function emitEvent(eventName, ...args) {
  
  // Call anyListeners if they exist
  // Remark: .onAny() can't really be used in production; however it could be very useful for slower fps debugging
  if (eventEmitter.anyListeners.length > 0) {
    eventEmitter.anyListeners.forEach(listener => {
      // do not emit to the emitter that emitted the event
      try {
        listener.call(null, eventName, ...args);
      } catch (error) {
        console.error(`Error when executing any listener for event "${eventName}":`, error);
      }
    });
  }

  // Directly check if listeners exist for the eventName
  const listeners = eventEmitter.listeners[eventName];
  if (listeners) {
    listeners.forEach(listener => {
      try {
        listener.apply(null, args);
      } catch (error) {
        console.error(`Error when executing listener for event "${eventName}":`, error);
      }
    });
  }
};

eventEmitter.bindClass = function bindClass(classInstance, namespace) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance));
  methods.forEach(method => {
    if (typeof classInstance[method] === 'function' && method !== 'constructor') {
      const eventName = namespace + '::' + method;
      const originalMethod = classInstance[method].bind(classInstance);
      this.emitters[eventName] = classInstance;
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

eventEmitter.listenerCount = function(eventPattern) {
  if (this.listeners[eventPattern]) {
    return this.listeners[eventPattern].length;
  }
  return 0;
};


export default eventEmitter;