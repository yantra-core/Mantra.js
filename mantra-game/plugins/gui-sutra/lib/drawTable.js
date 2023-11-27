import gui from '../../gui-editor/gui.js';

export default function drawTable() {
  let game = this.game;

  if (!game.systems['entity-input']) {
    console.log('entity-input system not found, skipping drawTable');
    return;
  }

  let entityInputSystem = game.systemsManager.getSystem('entity-input');
  let controls = entityInputSystem.controlMappings;

  let table = document.createElement('table');
  table.id = "sutraTable";

  for (let key in controls) {
    let row = table.insertRow();
    row.id = `row-${key}`;
    let cellKey = row.insertCell();
    let cellAction = row.insertCell();
    cellKey.textContent = key;
    cellAction.textContent = controls[key];
  }

  // Use gui.window() to create the window
  this.sutraView = gui.window('sutraView', 'Sutra Editor', function () {
    game.systemsManager.removeSystem(SutraGUI.id);
  });

  // Add a button to create new rules
  let addRuleButton = document.createElement('button');
  addRuleButton.textContent = 'Add Rule';
  addRuleButton.onclick = () => this.addNewRule();
  this.sutraView.appendChild(addRuleButton);
  this.sutraView.appendChild(table);
}