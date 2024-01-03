export default function createDrumKit(game, config) {
  // Drum kit components with their properties
  const drumComponents = [
    { type: 'kick', color: 0x0000ff, width: 100, height: 100, position: { x: 0, y: 50 } },
    { type: 'snare', color: 0xff0000, width: 60, height: 60, position: { x: 0, y: -50 } },
    { type: 'hiHatClosed', color: 0x00ff00, width: 40, height: 40, position: { x: -60, y: -30 } },
    { type: 'hiHatOpen', color: 0x00ff00, width: 40, height: 40, position: { x: -60, y: 30 } },
    { type: 'tomLow', color: 0xffff00, width: 70, height: 70, position: { x: 70, y: -30 } },
    { type: 'tomHigh', color: 0xffff00, width: 50, height: 50, position: { x: 70, y: 30 } }
  ];

  drumComponents.forEach(drum => {
    // Adjust positions based on the config's base position
    const posX = config.position.x + drum.position.x;
    const posY = config.position.y + drum.position.y;

    game.createEntity({
      type: 'NOTE',
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

    game.createEntity({
      type: 'TEXT',
      text: drum.type,
      color: 0x000000,
      style: {
        fontSize: '16px',
        textAlign: 'center',
        zIndex: 999
      },
      body: false,
      position: {
        x: posX,
        y: posY - drum.height / 3,
        z: 999
      }
    });
  });
}