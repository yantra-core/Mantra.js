let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Image', 'Player', 'Gamepad', 'Text'],
  defaultMovement: true
});
game.start(function(){

  game.make().size(256).Image({
    src: 'https://yantra.gg/mantra/img/game/env/warp-to-mantra-home-256.png'
  }).createEntity();

  game.make().size(256).Image({
    src: 'https://yantra.gg/mantra/img/game/env/warp-to-mantra-home-256.png'
  }).x(-300).body(true).createEntity();

  game.make().size(256).body(true).Image({
    src: 'https://yantra.gg/mantra/img/game/env/warp-to-mantra-home-256.png'
  }).x(300).body(true).createEntity();

  game.make().Text().x(100).y(-200).width(400).text('UI Image() is for User Interfaces.').style({
    color: 'white',
    fontSize: '24px',
  }).createEntity();

  game.make().Text().x(100).y(200).width(400).text('Use Textures for Entity Textures.').style({
    color: 'white',
    fontSize: '24px',
  }).createEntity();

  game.setBackground('black');
  game.make().Player().createEntity(); 

});
    
