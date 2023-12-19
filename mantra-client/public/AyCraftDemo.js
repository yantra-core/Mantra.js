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
  game.use('AyCraft');

  game.start(function(){
    game.use('Editor');

    document.addEventListener('click', function (e) {
      // check to see if we are inside an input, textarea, button or submit
      // if so, disable inputs controls
      let target = e.target;
      let tagName = target.tagName.toLowerCase();
      let type = target.type;
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'button' || tagName === 'submit') {
        game.systems['entity-input'].disableInputs();
        game.systems['keyboard'].unbindAllEvents();
      } else {
        game.systems['entity-input'].setInputsActive();
        game.systems['keyboard'].bindInputControls();
      }
    });
    

  });
  // game.use('Bullet');
  window.game = game;

  /*
  */
  // disable inputs



});
