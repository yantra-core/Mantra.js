
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three',
  plugins: [
    'Button',
    'Player',
    'Hexapod',
    'Block'
  ],
  camera: 'follow'
});
game.start(function(){

  game.make().Player().createEntity();
  game.make().Hexapod().repeat(11).x(-200).createEntity();

  game.make().Block().size(16).offset(-32, 32).repeat(10).createEntity();

  game.make().Button().text('Coordindates').position(0, 0).offset(0, 0).origin('bottom-right').style({
    position: 'absolute'
  })
  .createEntity();
  
  game.make().Button().text('Screen').position(0, 0).offset(-150).origin('bottom-left').style({
    position: 'absolute'
  }).createEntity();
  
  
  game.make().Button().text('Position').position(0, 0).offset(0, -150).origin('bottom-right').style({
    position: 'absolute'
  }).createEntity();
  
  
  game.make().Button().text('Absolute').position(0, 0).offset(-150, -150).origin('bottom-left').style({
    position: 'absolute'
  }).createEntity();

});
    