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
      beforeDestroyEntity: [],
      afterDestroyEntity: [],
      beforeUpdateEntity: [],
      afterUpdateEntity: [],
      beforeRenderEntity: [],
      afterRenderEntity: [],
      beforeHandleCollision: [],
      afterHandleCollision: [],
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
  // Remark: Manual spread is done here intentionally to avoid performance overhead ... spread or arguments scope
  //         In all internal cases we only use 1 or 2 arguments
  // Method to trigger all callbacks associated with a hook
  triggerHook(hookName, arg1, arg2, arg3, arg4) {

    const hooks = this.hooks[hookName];

    if (!hooks) { // `hooks` references Array.length, 0 returns false
      console.warn(`Hook '${hookName}' does not exist.`);
      return;
    }

    // Optimized for single element array
    if (hooks.length === 1) {
      hooks[0](arg1, arg2, arg3, arg4); // Directly pass arguments
      return;
    }

    // Arrays with more than 1 element
    for (let i = 0; i < hooks.length; i++) {
      hooks[i](arg1, arg2, arg3, arg4); // Directly pass arguments
    }
  }

}