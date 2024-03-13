export default function createPiano(game, config) {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
  let xPosition = config.position.x;

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
          borderRadius: '0px',
          border: 'solid'
        },
        pointerdown: function () {
          // alert('play')
        },
        width: keyWidth,
        height: keyHeight,
        isStatic: true,
        isSensor: true,
        position: {
          x: xPosition,
          y: config.position.y
        }
      });

      /* TODO: add back, was having issue getting pointerDown event context
      game.createEntity({
        type: 'TEXT',
        name: 'piano-roll-text',
        kind: key,
        text: key,
        color: 0x000000,
        style: {
          fontSize: '10px',
          textAlign: 'center',
          zIndex: 999
        },
        body: false,
        position: {
          x: xPosition + (keyWidth * 2) + 5,
          y: config.position.y + keyHeight,
          z: 10
        }
      });
      */

      xPosition += keyWidth;

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
          isSensor: true,
          style: {
            border: 'solid',
            zIndex: 9999,
            borderRadius: '0px'
          },
          position: {
            x: xPosition - blackKeyWidth, // Position the black key in the middle of two white keys
            y: config.position.y - blackKeyHeight / 2, // Slightly higher than white keys
            z: 2
          }
        });
      }
    });
  }

  /* removed ( for now, create common fn for creating keys )
  // Add the last key (C8)
  game.createEntity({
    type: 'NOTE',
    kind: 'C8',
    color: 0xccff00,
    width: keyWidth,
    height: keyHeight,
    isStatic: true,
    position: {
      x: xPosition,
      y: config.position.y
    }
  });

  game.createEntity({
    type: 'TEXT',
    text: 'C8',
    color: 0x000000,
    style: {
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: xPosition,
      y: config.position.y - 20,
      z: 64
    }
  });
  */
}