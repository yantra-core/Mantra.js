let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  gameRoot: 'http://192.168.1.80:7777/',
  /*
    Game size can be set at construction or after construction
  */
  width: 50,
  height: 300,
  plugins: ['Border'], // plugins at construction
});

let gamesizes = [
  {
    width: 100,
    height: 450
  },
  {
    width: 200,
    height: 600
  },
  {
    width: 300,
    height: 600
  },
  {
    width: 400,
    height: 600
  },
  {
    width: 500,
    height: 600
  },
  {
    width: 600,
    height: 600
  }
];

game.start(function(){
  game.createBorder();
  game.after('update', function () {
    if (game.tick % 50 === 0) {
      game.data.ents.BORDER.forEach(function (border) {
        game.removeEntity(border.id);
      });
      let size = gamesizes.shift();
      //
      // Game size can be set after construction
      //
      game.setSize(size.width, size.height);
      game.createBorder();
      gamesizes.push(size);
    }
  });


});
    