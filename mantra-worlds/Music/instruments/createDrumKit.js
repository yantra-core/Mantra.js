export default function createDrumKit(game, config) {
  // Drum kit components with their properties
  const drumComponents = [
    { type: 'kick', color: 0xffffff, width: 25, height: 25, position: { x: 0, y: 12.5 } },
    { type: 'snare', color: 0xffffff, width: 15, height: 15, position: { x: 0, y: -12.5 } },
    { type: 'hiHatClosed', color: 0xffffff, width: 10, height: 10, position: { x: -15, y: -7.5 } },
    { type: 'hiHatOpen', color: 0xffffff, width: 10, height: 10, position: { x: -15, y: 7.5 } },
    { type: 'tomLow', color: 0xffffff, width: 17.5, height: 17.5, position: { x: 17.5, y: -7.5 } },
    { type: 'tomHigh', color: 0xffffff, width: 12.5, height: 12.5, position: { x: 17.5, y: 7.5 } }
  ];

  drumComponents.forEach(drum => {
    // Adjust positions based on the config's base position
    const posX = config.position.x + drum.position.x;
    const posY = config.position.y + drum.position.y;

    game.createEntity({
      type: 'DRUM',
      kind: drum.type,
      color: drum.color,
      width: drum.width,
      height: drum.height,
      isStatic: true,
      position: {
        x: posX,
        y: posY
      }
    });

    // TODO: Remark: TEXT labels weren't aligned properly, removed for now
    /*
    // Adjust label positions
    const labelX = posX + drum.width / 2; // centering the label over the drum
    const labelY = posY + drum.height / 2; // centering the label over the drum

    game.createEntity({
      type: 'TEXT',
      text: drum.type,
      color: 0x000000,
      style: {
        font: '3px monospace',
        textAlign: 'right',
        zIndex: 999
      },
      body: false,
      position: {
        x: labelX,
        y: labelY,
        z: 999
      }
    });
    */
  });
}
