let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Text', 'Block', 'Border', 'Lifetime'], // plugins at construction
});

game.use('Bullet'); // plugins at runtime

game.start(function () {
  game.setBackground('#000000');
  game.createBorder();
  game.setGravity(0, 2);
  game.on('pointerDown', function (position, event) {
    console.log('oooo', position)
    let worldX = position.x, worldY = position.y;
    // Create entity at this location in the world
    game.createEntity({
      color: 0xffffff,
      size: {
        width: 100,
        height: 100
      },
      lifetime: 1000,
      position: {
        x: worldX,
        y: worldY,
        z: 1
      },
    });
  });

  game.on('pointerMove', function (position, event) {
    console.log('pointerMove', position)
    let text = `
      x: ${position.x}
      y: ${position.y}
    `;
    game.updateEntity(mouseInfo.id, {
      text: text
    });
  });

  let mouseInfo = game.make().Text()
    .color(0xffffff)
    .width(300)
    .height(20)
    .position(0,0)
    .origin('right')
    .layout('center')
    .createEntity();

  game.make().Text()
    .text('Click to create entities')
    .color(0xffffff)
    .width(500)
    .height(100)
    .style({
      backgroundColor: 'black',
      fontSize: '44px',
    })
    .position(0, -200)
    .createEntity();

});
window.game = game;