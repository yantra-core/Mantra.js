export default function harmonicShift(traktorKeyCode, options = { type: 'perfectFifth' }) {
  const wheelOrder = ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '10m', '11m', '12m', '1d', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '10d', '11d', '12d'];

  let currentIndex = wheelOrder.indexOf(traktorKeyCode);

  if (currentIndex === -1) {
    // keycode wasn't found, try to find it in the toneCode property
    let keys = Object.keys(this.keyCodes);
    let foundKey = keys.find(key => this.keyCodes[key].toneCode === traktorKeyCode);
    if (foundKey) {
      currentIndex = wheelOrder.indexOf(foundKey);
    }
  }

  if (currentIndex === -1) {
    // throw new Error('Invalid Traktor Key Code');
    console.log("WARNING: Could not find Traktor Key Code", traktorKeyCode)
    return;
  }

  switch (options.type) {
    case 'perfectFifth':
      // 7 steps forward for major, 7 steps backward for minor
      currentIndex += (traktorKeyCode.endsWith('m') ? -7 : 7);
      break;
    case 'majorMinorSwap':
      // Toggle between major and minor
      currentIndex += (traktorKeyCode.endsWith('m') ? 12 : -12);
      break;
    case 'shift':
      // Shift by a specified amount
      if (typeof options.amount !== 'number' || Math.abs(options.amount) > 3) {
        throw new Error('Invalid shift amount');
      }
      currentIndex += options.amount;
      break;
    default:
      throw new Error('Invalid transition type');
  }

  // Ensure the index wraps around the wheel
  currentIndex = (currentIndex + 24) % 24;

  return wheelOrder[currentIndex];
}

/*
// Example usage
console.log(harmonicShift('5m', { type: 'perfectFifth' })); // Expected output: 10m
console.log(harmonicShift('5m', { type: 'majorMinorSwap' })); // Expected output: 5d
console.log(harmonicShift('5m', { type: 'shift', amount: -2 })); // Expected output: 3m
*/
