let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Container', "Teleporter"],
  gameRoot: 'http://192.168.1.80:7777/'
});

game.start(function(){

  game.setBackground('#000000');
  game.setZoom(1.5);

  let containerA = game.make()
    .Container()
    .color(0xff00ff)
    .name('group-a')
    .width(300)
    .height(80)
    .position(-150, 0, -1)
    .style({
      padding: 0,
      margin: 0,
      // background: '#ff0000', // can also use Entity.color
      border: {
        color: '#000000',
        width: 0
      }
    }).createEntity();


    let containerB = game.make()
    .Container()
    .color(0x007fff)
    .name('group-b')
    .width(300)
    .height(80)
    .position(150, 0, -1)
    .style({
      padding: 0,
      margin: 0,
      // background: '#ff0000', // can also use Entity.color
      border: {
        color: '#000000',
        width: 0
      }
    }).createEntity();


    game.make().Teleporter().container('group-a').position(0, 0, 0).createEntity();
    game.make().Teleporter().container('group-b').position(0, 0, 0).createEntity();

});    