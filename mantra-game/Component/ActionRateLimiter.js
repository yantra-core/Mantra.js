import Component from "./Component.js";
class ActionRateLimiter extends Component {
  constructor(name, owner) {
    super(name, owner);
    this.entityActions = new Map(); // Store last action times per entity
  }

  // Record an action for a specific entity
  recordAction(entityId, actionName) {
    let actions = this.entityActions.get(entityId) || new Map();
    actions.set(actionName, Date.now());
    this.entityActions.set(entityId, actions);
  }

  // Get the last time an action was performed for a specific entity
  getLastActionTime(entityId, actionName) {
    let actions = this.entityActions.get(entityId);
    return actions ? (actions.get(actionName) || 0) : 0;
  }
}

export default ActionRateLimiter;