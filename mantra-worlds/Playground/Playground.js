export default class Playground {
  static id = 'world-playground';
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.
  //  this is currently used when switching between worlds in the GUI Editor
  //  the default behavior is to unload the world, then load the new world
  static type = 'world'; // type is optional for Plugins
  constructor() {
    this.id = Playground.id;
  }

  init(game) {
    this.game = game;
    game.config.defaultMouseMovement = false;

    // Movements with right click, switch default left-click-to-move behavior
    game.config.mouseMovementButton = 'RIGHT';
    // Actions with left click
    game.config.mouseActionButton = 'LEFT';
    // enables the default top-down mouse movements
    game.config.defaultMouseMovement = true;

    game.reset();

    game.data.camera.mode = 'none';
    this.createWorld();
  }

  async preload(game) {

    game.use('Player');
    game.use('Text');
    game.use('Platform');
    game.use('Teleporter');
    game.use('Editor');
    //game.use('Code');

    //game.use('Iframe');
    // game.use('IFrame');

  }

  createWorld() {
    let game = this.game;
    // game.make().Platform({ x: 0, y: 0, width: 16000, height: 9000 }).createEntity();
    // game.make().size(100).color('blue').createEntity();
    console.log('ggg', game.systems)
    //game.systems.editor.init(game);
    // game.systems.editor.show();

    let text = game.make().Text().text('Mantra.js Playground').style({
      fontSize: '64px',
    });
    text.width(900);
    text.position(85, -400, 0);
    text.createEntity();
    
    //let entities = text2Entities(text);

    let currentUrl = null;
    let exampleRoot = 'https://yantra.gg/mantra/examples/demo?source=';
    exampleRoot = 'http://192.168.1.80:7777/';

    let examples = [
      //      'https://yantra.gg/mantra/examples/demo?source=npc/hexapod',
      //      'https://yantra.gg/mantra/examples/demo?source=item/boomerang',
      //      'https://yantra.gg/mantra/examples/demo?source=item/flame',
      //      'https://yantra.gg/mantra/examples/demo?source=item/bullet',
      'demo?source=item/flame',
      'demo?source=item/boomerang',
      'demo?source=item/bullet',
    ];

    let container = game.createContainer({
      name: 'container-a',
      layout: 'grid', // optional. can also be "flex" or "none"
      color: 0xff00ff,
      position: {
        x: 0,
        y: 550,
        z: -1
      },
      body: false,
      size: {
        width: 800,
        height: 500
      },
      grid: {
        columns: 2,
        rows: 4
      },
      style: { // supports CSS property names
        padding: 0,
        margin: 0,
        // background: '#ff0000', // can also use Entity.color
        border: {
          color: '#000000',
          width: 0
        }
      },
    });

    let dropdownSelect = game.make().Select({
      options: examples
    })
    .container('container-a')

    dropdownSelect.afterUpdateEntity(function (context, event) {
      if (currentUrl === context.value) return;
      game.updateEntity(primaryGameEmbed.id, {
        meta: {
          src: exampleRoot + context.value
        }
      });
    });
    dropdownSelect.width(300).height(80);
    // dropdownSelect.position(-400, 500, 0);
    dropdownSelect.style({
      fontSize: '28px'
    })

    dropdownSelect.clone(8).createEntity();

    let primaryGameEmbed = game.make().Iframe({ src: 'https://yantra.gg/mantra/examples/demo?source=npc/hexapod' })
    primaryGameEmbed.width(800).height(600)
    primaryGameEmbed.x(0);
    primaryGameEmbed = primaryGameEmbed.createEntity();

    let codeEditor = game.make().Code({
    //  code: 'hello <h1>'
      src: 'https://yantra.gg/mantra/examples/npc/hexapod.js'
    }).height(800).width(600).x(800).createEntity();

    /*

    let gravitySlider = game.make().Range().width(100).position(-540, -400, 0).createEntity();

    let docsEmbed = game.make().width(800 * 2).height(600 * 2);
    docsEmbed.Iframe({ src: 'https://yantra.gg/mantra/examples/entity' })
    docsEmbed.x(100).y(800);
    docsEmbed.createEntity();

    let codeEmbed = game.make().width(800 * 2).height(600 * 2);
    codeEmbed.Iframe({ src: 'https://yantra.gg/mantra/examples' })
    codeEmbed.x(1200).y(800);
    codeEmbed.createEntity();
    */

    let player = game.make().Player();
    player.position(-300, 500, 0);
    player.createEntity();
    game.setZoom(0.5);

  }
}


function text2Entities(text) {
  let entities = [];
  let lines = text.split('');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let x = 0 + i * 32;
    let y = -200;
    let entity = game.make().Text({ text: line }).x(x).y(y).body(true).createEntity();
    entities.push(entity);
  }
  return entities;
}