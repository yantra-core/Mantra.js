
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['FlashMessage']
});
game.start(function () {

  game.systems.flash.showMessage('Hello')

  setInterval(() => {
    // Defaults info with duration of 5 seconds
    game.systems.flash.showMessage('Ping ' + new Date().getTime())
  }, 5000);

  game.systems.flash.showMessage({
    message: 'Stays until clicked',
    sticky: true,
  });

  // Success
  game.systems.flash.showMessage({
    message: 'Success ' + new Date().getTime(),
    type: 'success',
    duration: 1000
  });

  // Info
  game.systems.flash.showMessage({
    message: 'Info ' + new Date().getTime(),
    type: 'info',
    duration: 2000
  });

  // Warn
  game.systems.flash.showMessage({
    message: 'Warn ' + new Date().getTime(),
    type: 'warn',
    duration: 3000
  });

  // Error
  game.systems.flash.showMessage({
    message: 'Error ' + new Date().getTime(),
    type: 'error',
    duration: 4000
  });

  // Custom
  game.systems.flash.showMessage({
    message: 'Custom ' + new Date().getTime(),
    style: {
      backgroundColor: 'yellow',
      color: 'black'
    },
    duration: 5000
  });

});


//
//