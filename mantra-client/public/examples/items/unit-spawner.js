let game = new MANTRA.Game({
  defaultMovement: true,
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  camera: 'follow',
  plugins: ['UnitSpawner', 'Player', 'Lifetime', 'Gamepad', 'Bullet', 'Boomerang', 'Teleporter'],
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function () {

  game.build().Player().createEntity();

  let particleConfig = game.build()
    .type('PARTICLE')
    .color(0xf03025)
    .lifetime(10000)
    .size(4, 4)
    .position(200, 0)
    .build();

  game.setBackground('black');
  game.setZoom(2.5);
  
  game.build()
    .name('fountA')
    .type('FOUNT')
    .UnitSpawner({
      unitConfig: particleConfig
    })
    .color(0xf03025)
    .isStatic(true)
    .size(8, 8)
    .position(200, 0)
    .createEntity(); // Finalizes and creates the entity


  game.build()
    .name('fountB')
    .type('FOUNT')
    .UnitSpawner({
      unitConfig: {
        type: 'PARTICLE',
        color: 0x14b161,
        lifetime: 10000,
        // isSensor: true,
        position: { x: -200, y: 0 },
        sprayAngle: Math.PI,
      }
    })
    .color(0x14b161)
    .isStatic(true)
    .size(8, 8)
    .position(-200, 0)
    .createEntity(); // Finalizes and creates the entity

  game.build()
    .name('fountC')
    .type('FOUNT')
    .UnitSpawner({
      unitConfig: {
        type: 'PARTICLE',
        color: 0x3c62f8,
        lifetime: 10000,
        // isSensor: true,
        position: { x: 0, y: -200 },
        sprayAngle: Math.PI / 2,
      }
    })
    .color(0x3c62f8)
    .isStatic(true)
    .size(8, 8)
    .position(0, -200)
    .createEntity(); // Finalizes and creates the entity

  game.build()
    .name('fountD')
    .type('FOUNT')
    .UnitSpawner({
      unitConfig: {
        type: 'PARTICLE',
        color: 0xe9dd34,
        lifetime: 10000,
        // isSensor: true,
        position: { x: 0, y: 200 },
        sprayAngle: -Math.PI / 2,
      }
    })
    .color(0xe9dd34)
    .isStatic(true)
    .size(8, 8)
    .position(0, 200)
    .createEntity(); // Finalizes and creates the entity

  // teleports to the next example
  game.build().Teleporter({
    url: 'http://192.168.1.80:8888/npc/hexapod',
  }).position(200, 200).createEntity()



});
