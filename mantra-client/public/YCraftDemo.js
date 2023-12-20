document.addEventListener('DOMContentLoaded', async (event) => {

  //return realStoneSystem;

  let game = new MANTRA.Game({
    physics: 'matter', // enum, 'physx', 'matter
    collisions: true,
    graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
    camera: 'follow',
    options: {
      scriptRoot: './'
    }
  });
  game.use('YCraft');

  game.start(function(){
    game.use('Editor');
  });
  // game.use('Bullet');
  window.game = game;

  /*
  */
  // disable inputs



});
