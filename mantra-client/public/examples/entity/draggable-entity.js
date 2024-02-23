
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Draggable', 'Droppable', 'RBush', 'Flame', 'Tower', 'Bullet', 'Hexapod', 'GamepadGUI', 'Editor'],
  
});
game.start(function () {

  function onDrop(context, event) {
    console.log('dropped', context, event);

    // destroy the dropped item
    game.removeEntity(context.id);

    // increase the size of the area
    game.updateEntity(context.dropTarget.id, {
      size: {
        width: context.dropTarget.size.width * 2,
        height: context.dropTarget.size.height * 2
      }
    });

  }

  /*
  let conf = game.make().Draggable().Droppable().color('red').size(32).position(-100, 0).offset(48).repeat(10);
  conf.onDrop(onDrop).isSensor(true);
  console.log(conf.config)
  conf.createEntity();
  */

  let conf2 = game.make().Draggable().size(64).color('red').position(100, 0, 2);
  //conf2.onDrop(onDrop).isSensor(true);
  console.log(conf2.config)
  //conf2.createEntity();

  let dropArea = game.make().size(100, 100).color('yellow').position(0, -140, -1);

  dropArea.onDrop(onDrop)
  dropArea.createEntity();


  function onDrop(context, event) {
    // update the position of the context entity to the dropTarget
    // mix the current colors if possible
    let colorA = context.color;
    let colorB = context.dropTarget.color;
    if (colorA && colorB) {
      console.log('colorA', colorA, 'colorB', colorB);
      let configA = game.make().color(colorA).build();
      let configB = game.make().color(colorB).build();
      let mixed = game.make().mix(configA).mix(configB).build();
      
      // check that ent exists
      let exists = game.exists(context.id);
      if (!exists) {
        // console.log('context entity does not exist');
        return;
      }
      game.updateEntity(context.id, {
        color: mixed.color,
        size: {
          width: context.size.width * 1.5,
          height: context.size.height * 1.5
        }

        // increase size of entity by 1.5x
        /* Remark: why did this not work for CSSGraphics?
        */
      });
    }
    game.updateEntity(context.id, {
      position: context.dropTarget.position
    });
    game.removeEntity(context.dropTarget.id);
  }

  // assume 24 color HSV wheel and generate all colors as int or hex whatever is easy
  for (let i = 0; i < 24; i++) {
    let conf = game.make().Draggable().Droppable().radius(8).onDrop(onDrop).position(-200 + i * 40, 0);
    conf.isSensor(true);
    console.log('conf', conf)
    // we need to generate color wheel here as int or hex
    //let color = ;
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    conf.color(color);
    conf.createEntity();
  }

  /*
  let draggable = game.make().Tower().color('yellow').position(-175, 140);
  draggable.pointerdown(function (context, event) {

    // fix the context ( entity ) to the pointer
    game.updateEntity(context.id, {
      update: function (entity) {
        // console.log('sup dating', game.data.mouse.position)
        //entity.position.x = event.x;
        //entity.position.y = event.y;
        game.updateEntity(entity.id, {
          position: game.data.mouse.worldPosition
        });
      }
    })
  })

  draggable.pointerup(function (context, event) {
    // release the context ( entity ) from the pointer by clearing the update
    // TODO: this will remove all updates, we'll need to manage the wrapped fn.events array here
    //       it is already possible with current architecture, just need to implement it
    game.updateEntity(context.id, {
      update: null
    });
  });

  draggable.createEntity();
  */

});
