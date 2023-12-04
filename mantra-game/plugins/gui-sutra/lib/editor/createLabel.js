export default function createLabel(key, indentLevel) {
  let label = document.createElement('label');
  label.textContent = key;
  label.className = 'param-label';
  label.style.marginLeft = '10px';
  // make bold
  label.style.fontWeight = 'bold';
  //label.style.marginLeft = `${indentLevel * 10}px`;
  return label;
}