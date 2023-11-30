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

  // Add a "Show Sutra" button
  let showSutraButton = document.createElement('button');
  showSutraButton.textContent = 'Show Sutra';
  showSutraButton.onclick = () => this.showSutra();

  // Add a button to create new rules
  let addRuleButton = document.createElement('button');
  addRuleButton.textContent = 'Add Rule';
  addRuleButton.onclick = () => this.addNewRule();

  // Add view JSON button
  let viewJsonButton = document.createElement('button');
  viewJsonButton.textContent = 'JSON';
  viewJsonButton.onclick = () => this.viewJson();

  // Add "Read Sutra" button
  let readSutraButton = document.createElement('button');
  readSutraButton.textContent = 'Read Sutra';
  readSutraButton.onclick = () => this.viewSutraEnglish();

  let guiContent = this.sutraView.querySelector('.gui-content');

  // set background color to transparent
  this.sutraView.style.backgroundColor = 'transparent';

  let slider = createOpacitySlider(this.sutraView);

  // Create and append the new footer
  let footer = document.createElement('div');
  footer.className = 'gui-window-footer';

  guiContent.appendChild(showSutraButton);
  guiContent.appendChild(viewJsonButton);
  guiContent.appendChild(readSutraButton);
  guiContent.appendChild(slider);

  guiContent.appendChild(table);

  // add <br>
  guiContent.appendChild(document.createElement('br'));
  guiContent.appendChild(addRuleButton);


  // create save button
  let saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.onclick = () => this.saveSutra();
  footer.appendChild(saveButton);

  //this.sutraView.appendChild(guiContent);
  this.sutraView.appendChild(footer);

  // trigger slider event to update background color
  slider.querySelector('input').dispatchEvent(new Event('input'));
  // this.sutraView.appendChild(footer);

}

function createOpacitySlider(element) {
  // Create the wrapper div
  const wrapper = document.createElement('div');
  wrapper.style.position = 'absolute'; // Or 'relative' depending on your layout
  wrapper.style.right = '40px'; // Adjust the value as needed
  wrapper.style.top = '5px'; // Adjust the value as needed
  wrapper.style.zIndex = '10'; // Ensure it's above other elements

  // Create the slider element
  const slider = document.createElement('input');
  slider.setAttribute('type', 'range');
  slider.setAttribute('min', '0');
  slider.setAttribute('max', '1');
  slider.setAttribute('step', '0.01');
  slider.setAttribute('value', '0.88'); // Start with a fully transparent background
  slider.style.width = '110px'; // Make the slider larger
  slider.style.transform = 'scale(1.5)'; // Scale the slider for better visibility
  slider.style.cursor = 'pointer';

  // Append the slider to the wrapper
  wrapper.appendChild(slider);

  // Set initial background color with 0 opacity using rgba
  element.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Assuming you want to start with a black background

  // Add an event listener to the slider
  slider.addEventListener('input', function () {
    // Update the background color with the new opacity value
    const opacity = this.value;
    element.style.backgroundColor = `rgba(10, 15, 27, ${opacity})`; // #0a0f1b converted to rgba
  });

  return wrapper;
}