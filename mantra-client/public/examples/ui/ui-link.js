let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Link'],
  
});
game.start(function(){

  let link = game.make()
  .Link({
    href: 'https://yantra.gg/mantra/home',
    target: '_blank'
  })
  .style({
    fontSize: '32px',
    color: 'purple',
  })
  .text('Click Me!')
  .width(600)
  .height(20)
  .createEntity();
  
});