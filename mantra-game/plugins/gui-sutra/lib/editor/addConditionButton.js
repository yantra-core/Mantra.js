export function addConditionButton(self, conditionalName, node) {
  // create add condition below button
  let addConditionBelowButton = document.createElement('button');
  addConditionBelowButton.type = 'submit';
  addConditionBelowButton.className = 'add-condition-below-button';
  addConditionBelowButton.textContent = 'Add Condition Below';

  addConditionBelowButton.onclick = (event) => {
    event.preventDefault();
    // create a new conditional name
    // TODO: this is not working correctly yet
    // TODO: have a big list of made up names for new behavior tree nodes
    //let newConditionalName = 'newCondition';
    // create the new conditional with placeholder values
    // update the condition immediately with placeholder values
    // and redraw the behavior tree, let UI take care of everything else

    console.log('about to update condition', conditionalName)

    // get the existing condition
    let existingCondition = this.behavior.getCondition(conditionalName);
    // create a new array of conditions
    let newConditionObj = [];
    // add the existing condition to the new array

    if (Array.isArray(existingCondition)) {
      existingCondition.forEach((cond, index) => {
        newConditionObj.push(cond);
      });
    } else {
      newConditionObj.push(existingCondition);
    }

    // add a new condition to the new array
    newConditionObj.push({ op: '==', property: '', value: '' });
    console.log('updating', conditionalName, newConditionObj)
    // create the new property but doesn't save it until user clicks "Save"
    //    return;
    self.behavior.updateCondition(conditionalName, newConditionObj, true);

    // get the update condition to verify it was updated
    let updatedCondition = this.behavior.getCondition(conditionalName);
    console.log('updatedCondition', updatedCondition);

    let updatedNode = self.behavior.findNode(node.sutraPath);

    // reload window with updated node
    self.showConditionalsForm(updatedNode);

    // show serialized behavior tree
    console.log('serialized behavior tree', self.behavior.serializeToJson());
    //this.behavior.addCondition(newConditionalName, { op: '==', property: '', value: '' });
    // let newConditionalName = this.behavior.getUniqueConditionalName();
    // creates a new empty condition form
    // self.createConditionalForm(conditionalName, node);
  };

}

