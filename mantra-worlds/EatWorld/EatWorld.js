// EatWorld.js - Marak Squires 2024
export default class EatWorld {
  static id = 'eat-world';
  static type = 'world';

  constructor() {
    this.id = EatWorld.id;
    this.type = EatWorld.type;
    this.dropping = false;
    this.slurping = false;
  }

  async preload(game) {
    // preload these plugins before the plugin starts
    game.use('Player');
    game.use('GravityWell');
    game.use('UnitSpawner');
    game.use('Teleporter');
  }

  init(game) {
    this.game = game;

    this.createWorld();
  }

  createWorld () {

    let game = this.game;

    game.setZoom(3.5);


    for (let i = 0; i < 100; i++) {
      let randomPosition = game.randomPositionRadial(0, 0, 400);
      let food = game.make().color(game.randomColor()).x(randomPosition.x).y(randomPosition.y).width(8).height(8);

      food.collisionStart(function (a, b, event, context) {

        game.removeEntity(context.owner.id);

        let player = context.target;
        game.updateEntity(player.id, {
          size: {
            width: player.size.width + 1,
            height: player.size.height + 1
          }
        })
        let randomPosition = game.randomPositionRadial(0, 0, 400);
        let food2 = game.make().color(game.randomColor()).x(randomPosition.x).y(randomPosition.y).width(8).height(8);
        let randomPosition2 = game.randomPositionRadial(0, 0, 400);
        let food3 = game.make().color(game.randomColor()).x(randomPosition2.x).y(randomPosition2.y).width(8).height(8);
    

      });

      food.createEntity();
    }
    //let randomPosition = game.randomPositionRadial(0, 0, 600);
    //console.log('randomPosition', randomPosition)
    //game.make().color(game.randomColor()).x(randomPosition.x).y(randomPosition.y).width(8).height(8).createEntity();
    //game.make().color('red').position(-100, -100).width(32).height(32).createEntity();

    game.make().Player().color('#FF00FF').depth(20).position(0,0,0).texture(null).createEntity();

    // game.make().Border().createEntity();
    // game.systems.border.createBorder()
    game.use("Border", {
      autoBorder: true
    });

    // alert('createWorld')
  }
}
