// Lifecycle.js - Marak Squires 2024
export default class Lifecycle {
  constructor() {
    this.hooks = {
      // TODO: all all lifecycle events
      beforeUpdate: [],
      afterUpdate: [],
      beforeRender: [],
      afterRender: [],
      beforeCreateEntity: [],
      afterCreateEntity: [],
      beforeRemoveEntity: [],
      afterRemoveEntity: [],
      beforeUpdateEntity: [],
      afterUpdateEntity: [],
      beforeRenderEntity: [],
      afterRenderEntity: [],
      beforeHandleInput: [],
      afterHandleInput: [],
      beforeHandleCollision: [],
      afterHandleCollision: [],
      beforeCleanupRemovedEntities: [],
      afterCleanupRemovedEntities: [],
      beforeCollisionStart: [],
      beforeCollisionActive: [],
      beforeCollisionEnd: [],
      afterCollisionStart: [],
      afterCollisionActive: [],
      afterCollisionEnd: [],
      // Add more lifecycle events as needed
    };
  }

  clearAllHooks() {
    // go through all hooks and clear them
    for (let hookName in this.hooks) {
      this.hooks[hookName] = [];
    }
  }

  // Method to add a custom hook
  addHook(hookName, callback) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].push(callback);
    } else {
      console.warn(`Hook '${hookName}' does not exist.`);
    }
  }

  // Remark: `triggerHook` has been optimized for performance, please avoid refactoring without benchmarking
  // Method to trigger all callbacks associated with a hook
  triggerHook(hookName, data, arg2, arg3) {
    const hooks = this.hooks[hookName];

    if (!hooks) { // `hooks` references object exists or Array.length, 0 returns false
      // console.warn(`Hook '${hookName}' does not exist.`);
      return data; // Return the initial data if no hooks exist
    }

    let result = data; // Initialize result with the data being processed

    // Optimized for single element array
    if (hooks.length === 1) {
      // Returns a single result from single array, allowing the hook to modify and return the data
      return hooks[0](result, arg2, arg3);
    }

    // Arrays with more than 1 element
    for (let i = 0; i < hooks.length; i++) {
      // Pass the result of the previous hook (or the initial data for the first hook) to the next hook
      result = hooks[i](result, arg2, arg3);
    }

    return result; // Return the final result after all hooks have been processed
  }

}