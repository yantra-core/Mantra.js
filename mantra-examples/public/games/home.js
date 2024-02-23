
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
});
game.start(() => {
  game.use(new WORLDS.worlds['Home']());
});

//