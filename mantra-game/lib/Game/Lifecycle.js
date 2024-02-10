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
      beforeHandleCollision: [],
      afterHandleCollision: [],
      beforeCleanupRemovedEntities: [],
      afterCleanupRemovedEntities: [],
      // Add more lifecycle events as needed
    };
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
  triggerHook(hookName, data) {
    const hooks = this.hooks[hookName];

    if (!hooks) { // `hooks` references Array.length, 0 returns false
      console.warn(`Hook '${hookName}' does not exist.`);
      return data; // Return the initial data if no hooks exist
    }

    let result = data; // Initialize result with the data being processed

    // Optimized for single element array
    if (hooks.length === 1) {
      // Returns a single result from single array, allowing the hook to modify and return the data
      return hooks[0](result);
    }

    // Arrays with more than 1 element
    for (let i = 0; i < hooks.length; i++) {
      // Pass the result of the previous hook (or the initial data for the first hook) to the next hook
      result = hooks[i](result);
    }

    return result; // Return the final result after all hooks have been processed
  }

}