export default function createBackground(game) {


  game.make()
    .type('BACKGROUND')
    .texture('garden')
    .body(false)
    .size(300, 300, 1)
    .position(0, 0, -10)
    .createEntity();

  game.make()

    .type('BACKGROUND')
    .texture('sutra-tree')
    .body(false)
    .size(1024 / 4, 1024 / 4, 1)
    .position(0, 300, 32)
    .createEntity();

  game.make()
    .type('BACKGROUND')
    .texture('robot-arms-apartment')
    .kind('building')
    .size(1340, 3668, 1)
    .body(false)
    .position(900, -1800, -1)
    .createEntity();

  game.make()
    .type('BACKGROUND')
    .texture('planet-express-base')
    .kind('building')
    .size(2048, 2048, 1)
    .body(false)
    .position(-900, -800, -1)
    .createEntity();


  game.make()
    .type('BLOCK')
    .texture('tile-block')
    .size(200, 200, 1)
    .mass(10000)
    .position(200, -800, -8)
    .createEntity();


  // if touch warp, switch to YCraft level
  game.createEntity({
    type: 'WARP',
    // kind: 'YCraft',
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-ycraft',
    isStatic: true,
    isSensor: true,
    style: {
      scrollTexture: true
    },
    exit: {
      world: 'YCraft', // optional, if not specified will use the current world
      position: {      // optional, if not specified will use 0,0,0
        x: 0,
        y: 0
      }
    },
    position: {
      x: 0,
      y: -210,
      z: 32
    }
  });

  // text label saying "Warp To YCraft World"
  game.createEntity({
    type: 'TEXT',
    text: 'YCraft World',
    width: 164,
    // kind: 'dynamic',
    color: 0x000000,
    style: {
      fontSize: '16px',
      textAlign: 'center',
      paddingLeft: '20px', // for now
      scrollTexture: true
    },
    body: false,
    position: {
      x: -20,
      y: -260,
      z: 64
    }
  });

  // Teleports the Player to the Home world
  game.make()
    .Teleporter({
      destination: {
        world: 'Music'
      },
      clickToTeleport: false
    })
    .style({
      scrollTexture: true
    })
    .texture('warp-to-music')
    .size(64)
    .position(-250, -10, 1)
    .createEntity();

  game.make().Text()
    .text('Music World')
    .width(200)
    .height(100)
    .style({
      padding: '2px',
      fontSize: '16px',
      color: '#ffffff',
      textAlign: 'center'
    })
    .position(-250, -20, 32)
    .createEntity();


    game.make().Text()
    .text('Platform World')
    .width(200)
    .height(100)
    .style({
      width: '120px',
      fontSize: '16px',
      textAlign: 'center'
    })
    .position(290, -10, 32)
    .createEntity();

  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'Platform'
    },
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-platform',
    style: {
      scrollTexture: true
    },
    isStatic: true,
    isSensor: true,
    position: {
      x: 250,
      y: 0,
      z: 1
    }
  });

  //
  // Warp to Maze World
  //
  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'Maze'
    },
    size: {
      width: 64,
      height: 64,
      depth: 16
    },
    // texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,

    position: {
      x: -250,
      y: 250,
      z: 16
    }
  });

  // text label
  game.createEntity({
    type: 'TEXT',
    width: 80,
    text: 'Maze World',
    // width: 200,
    color: 0x000000,
    style: {
      width: '50px',
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: -235,
      y: 230,
      z: 32
    }
  });


  //
  // Warp to Gravity Gardens
  //
  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'GravityGardens'
    },
    width: 64,
    height: 64,
    depth: 16,
    // texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,
    position: {
      x: 250,
      y: 250,
      z: 16
    }
  });

  // text label
  game.createEntity({
    type: 'TEXT',
    width: 80,
    text: 'Gravity Gardens',
    // width: 200,
    color: 0x000000,
    style: {
      width: '100px',
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: 240,
      y: 230,
      z: 32
    }
  });


}




/*

game.createEntity({
name: 'raiden-left',
type: 'BACKGROUND',
width: 64,
height: 64,
depth: 64,
style: {
display: 'none'
},
texture: 'raiden',
body: false,
position: {
x: 0,
y: 10,
z: 32
}
});

game.createEntity({
name: 'raiden-right',
type: 'BACKGROUND',
width: 64,
height: 64,
depth: 64,
style: {
display: 'none'
},
texture: 'raiden',
body: false,
position: {
x: 100,
y: 10,
z: 32
}
});

*/




/*
// displays some items from the spritesheet
let itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb', 'iceArrow', 'boomerang'];
itemsList = []; // for now
itemsList.forEach((item, index) => {
  game.createEntity({
    type: item.toUpperCase(),
    kind: item,
    width: 16,
    height: 16,
    depth: 32,
    texture: {
      sheet: 'loz_spritesheet',
      sprite: item,
    },
    position: {
      x: -100 + (index * 32),
      y: 150,
      z: 32
    }
  });
});
*/