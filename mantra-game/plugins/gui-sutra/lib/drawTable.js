import gui from '../../gui-editor/gui.js';

export default function drawTable() {
  let game = this.game;
  let self = this;
  if (!game.systems['entity-input']) {
    console.log('entity-input system not found, skipping drawTable');
    return;
  }

  let table = document.createElement('div');
  table.id = "sutraTable";

  // Use gui.window() to create the window
  this.sutraView = gui.window('sutraView', 'Sutra Editor', function () {
    game.systemsManager.removeSystem(self.id);
  });

  // Add a button to create new rules
  let addRuleButton = document.createElement('button');
  addRuleButton.textContent = 'Add Rule';
  addRuleButton.onclick = () => this.addNewRule();

  let guiContent = this.sutraView.querySelector('.gui-content');
  guiContent.appendChild(addRuleButton);
  guiContent.appendChild(table);

  //this.sutraView.appendChild(addRuleButton);
  //this.sutraView.appendChild(table);
}