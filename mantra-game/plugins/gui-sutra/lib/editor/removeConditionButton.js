export function removeConditionButton(condition, node) {
  // Create the remove condition button
  let removeConditionButton = document.createElement('button');
  removeConditionButton.type = 'submit';
  removeConditionButton.className = 'remove-condition-button';
  removeConditionButton.textContent = 'Remove Entire If Condition';

  removeConditionButton.onclick = (event) => {
    event.preventDefault();
    this.behavior.removeNode(node.sutraPath);
    // close the editor window since we deleted the condition we were editing
    let sutraFormView = document.getElementById('sutraFormView');
    if (sutraFormView) {
      sutraFormView.remove();
    }
    //this.behavior.removeCondition(conditionalName);
    this.redrawBehaviorTree();
  };

}

