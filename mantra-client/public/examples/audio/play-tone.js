
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Tone', 'Border']
});

game.start(function(){

  // creates a border around the game
  game.createBorder();

  // listen for pointerDown events on game, we could also bind events directly to entities
  game.on('pointerDown', (entity) => {
    // Tone audio powered by Tone.js
    // All options for the Tone.js library are available
    // see: https://github.com/Tonejs/Tone.js
    if (entity.name === 'my-note') {
      // note, duration, now = 0, velocity = 0.5
      game.playNote('C4');
    }
    if (entity.name === 'drum-kick') {
      game.playDrum('kick');
    }
  });

  // create a note button entity
  game.createEntity({
    name: 'my-note',
    color: 0x0000ff,
    isStatic: true,
    isSensor: true,
    position: {
      x: -100,
      y: 0
    }
  });

  // create a drum kick entity
  game.createEntity({
    name: 'drum-kick',
    color: 0x00ff00,
    isStatic: true,
    isSensor: true,
    position: {
      x: 100,
      y: 0
    }
  });

});
    