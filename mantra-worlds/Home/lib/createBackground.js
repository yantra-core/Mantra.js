export default function createBackground(game) {


  game.build()
    .type('BACKGROUND')
    .texture('garden')
    .body(false)
    .size(300, 300, 1)
    .position(0, 0, -10)
    .createEntity();

  game.build()

    .type('BACKGROUND')
    .texture('sutra-tree')
    .body(false)
    .size(1024 / 4, 1024 / 4, 1)
    .position(0, 300, 32)
    .createEntity();

  game.build()
    .type('BACKGROUND')
    .texture('robot-arms-apartment')
    .kind('building')
    .size(1340, 3668, 1)
    .body(false)
    .position(900, -1800, -1)
    .createEntity();

  game.build()
    .type('BACKGROUND')
    .texture('planet-express-base')
    .kind('building')
    .size(2048, 2048, 1)
    .body(false)
    .position(-900, -800, -1)
    .createEntity();


  game.build()
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
    text: 'Warp To YCraft World',
    width: 164,
    // kind: 'dynamic',
    color: 0x000000,
    style: {
      fontSize: '16px',
      textAlign: 'center',
      paddingLeft: '20px', // for now

    },
    body: false,
    position: {
      x: -20,
      y: -220,
      z: 64
    }
  });

  game.createEntity({
    type: 'TEXT',
    text: 'CSSGraphics Engine',
    width: 20,
    color: 0x000000,
    style: {
      width: '150px',
      fontSize: '12px',
      textAlign: 'center',
      color: 'black',
      opacity: 0.22
    },
    body: false,
    position: {
      x: -63,
      y: -16,
      z: -2
    }
  });

  game.build().Teleporter().position(55, 71, 10)
    .size(16)
    .width(16)
    .height(16)
    .createEntity();

    game.build().Teleporter().position(-55, 71, 10)
    .size(16)
    .width(16)
    .height(16)
    .createEntity();
  

  // if touch warp, switch to Music level
  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'Music'
    },
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-music',
    isStatic: true,
    isSensor: true,
    position: {
      x: -250,
      y: 0,
      z: 32
    }
  });

  // text label saying "Warp To Platform World"
  game.createEntity({
    type: 'TEXT',
    width: 100,
    text: 'Warp To Music World',
    // width: 200,
    color: 0x000000,
    style: {
      width: '100px',
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: -250,
      y: -30,
      z: 64
    }
  });

  // text label saying "Warp To Platform World"
  game.createEntity({
    type: 'TEXT',
    text: 'Warp To Platform World',
    color: 0x000000,
    width: 120,
    height: 200,
    style: {
      width: '120px',
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: 250,
      y: 20,
      z: 64
    }
  });

  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'Platform'
    },
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,
    position: {
      x: 250,
      y: 0,
      z: 32
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
    width: 64,
    height: 64,
    depth: 64,
    // texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,
    position: {
      x: -250,
      y: 250,
      z: 32
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
      y: 280,
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
    depth: 64,
    // texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,
    position: {
      x: 250,
      y: 250,
      z: 32
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
      y: 280,
      z: 32
    }
  });

  /*
  // if touch note play sound
  game.createEntity({
    type: 'NOTE',
    color: 0xccff00,
    width: 32,
    height: 32,
    depth: 16,
    isStatic: true,
    position: {
      x: -120,
      y: -200,
      z: 32
    }
  });
  */

}



/*
// switch to CSSGraphics
game.createEntity({
  name: 'CSSGraphics',
  kind: 'CSSGraphics',
  collisionActive: true,
  collisionEnd: true,
  collisionStart: true,

  type: 'TEXT',
  text: 'CSS',
  width: 60,
  height: 50,
  //color: 0xffffff,
  style: {
    width: '60px',
    height: '30px',
    fontSize: '12px',
    color: 'white',
    textAlign: 'center',
    // border: '1px solid white',
    opacity: 0.7
  },
  body: true,
  isSensor: true,
  position: {
    x: -55,
    y: 75,
    z: 10
  }
});
*/

/*
// switch to 3d text label
game.createEntity({
  name: 'BabylonGraphics',
  collisionActive: true,
  collisionEnd: true,
  collisionStart: true,
  kind: 'BabylonGraphics',
  type: 'TEXT',
  text: '3D',
  width: 60,
  height: 50,
  color: 0x000000,
  style: {
    width: '60px',
    height: '30px',
    fontSize: '12px',
    color: 'white',
    textAlign: 'center',
    opacity: 0.7
  },
  body: true,
  isSensor: true,
  position: {
    x: 55,
    y: 75,
    z: 64
  }
});
*/




/*
game.createEntity({
  name: 'noteInfo',
  type: 'TEXT',
  text: 'This is a note, touch it to play a sound',
  fontSize: 16,
  color: 0x000000,
  body: false,
  style: {
    fontSize: '16px'
  },
  position: {
    x: 0,
    y: -200,
    z: 64
  }
});
*/

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