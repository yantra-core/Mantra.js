async function start () {
  let game = new MANTRA.Game({
    width: 400,
    height: 300,
    graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
    plugins: ['Editor']
  });
  await game.start();
  await game.loadScripts('/worlds.mantra.js');
  game.use('Editor');
  game.use(new WORLDS.worlds['Maze']());
}
start();

//