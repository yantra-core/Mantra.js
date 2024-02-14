let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  plugins: ['Tone'],
});

game.start(function () {

  game.on('pointerDown', (entity) => {
    if (entity.type === 'NOTE') {
      game.playNote(entity.kind);
    }
  });

  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

  let config = {
    width: 1200,
    height: 200,
    position: {
      x: -600,
      y: 0
    }
  };

  // Calculate key widths based on total width and number of white keys
  const totalWhiteKeys = 52; // 7 white keys per octave, 7.5 octaves
  const keyWidth = config.width / totalWhiteKeys;
  const blackKeyWidth = keyWidth / 2.5; // Black keys are usually narrower

  const keyHeight = config.height;
  const blackKeyHeight = keyHeight / 2;

  for (let octave = 0; octave < 8; octave++) {
    whiteKeys.forEach((note, index) => {
      const key = note + octave;
      game.createEntity({
        type: 'NOTE',
        kind: key,
        color: 0xffffff, // White key color
        style: {
          borderRadius: '0px'
        },
        width: keyWidth,
        height: keyHeight,
        isStatic: true,
        position: config.position
      });

      config.position.x += keyWidth;

      // Add black key after this white key, except after E and B
      if (note !== 'E' && note !== 'B') {
        const blackKey = blackKeys[index] + octave;
        game.createEntity({
          type: 'NOTE',
          kind: blackKey,
          color: 0xff0000, // Black key color
          width: blackKeyWidth,
          height: blackKeyHeight,
          isStatic: true,
          style: {
            border: 'solid',
            zIndex: 9999,
            borderRadius: '0px'
          },
          position: {
            x: config.position.x - blackKeyWidth, // Position the black key in the middle of two white keys
            y: config.position.y - blackKeyHeight / 2, // Slightly higher than white keys
            z: 9990
          }
        });
      }
    });
  }

});