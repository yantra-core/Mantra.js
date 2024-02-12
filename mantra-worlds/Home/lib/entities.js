/*


  Game Entities can be expressed as JSON objects, and then loaded into the game using game.load(entities)
  
  game.load(entities) will iterate over the entities and call game.createEntity(entity) for each entity

  You may also call game.createEntity(entity) to create a single entity

*/

export default entities = [
  {
    type: "BACKGROUND",
    texture: 'garden',
    width: 300,
    height: 300,
    body: false,
    position: { x: 0, y: 0, z: -10 }
  },
  {
    name: 'sutra-tree',
    type: 'BACKGROUND',
    width: 1024 / 4,
    height: 1024 / 4,
    depth: 1,
    texture: 'sutra-tree',
    body: false,
    position: { x: 0, y: 300, z: 32 }
  },
  {
    type: 'BACKGROUND',
    texture: 'robot-arms-apartment',
    kind: 'building',
    depth: 1,
    width: 1340,
    height: 3668,
    body: false,
    position: { x: 900, y: -1800, z: -1 }
  },
  {
    type: 'BACKGROUND',
    texture: 'planet-express-base',
    kind: 'building',
    width: 2048,
    height: 2048,
    depth: 1,
    body: false,
    position: { x: -900, y: -800, z: -1 }
  },
  {
    type: 'BLOCK',
    texture: 'tile-block',
    width: 200,
    height: 200,
    mass: 10000,
    position: { x: 200, y: -800, z: -8 }
  },
  {
    type: 'WARP',
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-ycraft',
    isStatic: true,
    isSensor: true,
    exit: { world: 'YCraft', position: { x: 0, y: 0 } },
    position: { x: 0, y: -210, z: 32 }
  },
  {
    type: 'TEXT',
    text: 'Warp To YCraft World',
    width: 164,
    color: 0x000000,
    style: { fontSize: '16px', textAlign: 'center', paddingLeft: '20px' },
    body: false,
    position: { x: -20, y: -220, z: 64 }
  },
  {
    type: 'TEXT',
    text: 'CSSGraphics Engine',
    width: 20,
    color: 0x000000,
    style: { width: '150px', fontSize: '12px', textAlign: 'center', color: 'black', opacity: 0.22 },
    body: false,
    position: { x: -63, y: -16, z: -2 }
  },
  {
    type: 'DOOR',
    body: true,
    isStatic: true,
    collisionStart: true,
    texture: { sheet: 'loz_spritesheet', sprite: 'ayyoDoor' },
    width: 16,
    height: 16,
    position: { x: 55, y: 71, z: 10 }
  },
  {
    type: 'DOOR',
    texture: { sheet: 'loz_spritesheet', sprite: 'ayyoDoor' },
    width: 16,
    height: 16,
    body: true,
    isStatic: true,
    collisionStart: true,
    position: { x: -55, y: 71, z: 10 }
  },
  {
    type: 'WARP',
    exit: { world: 'Music' },
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-music',
    isStatic: true,
    isSensor: true,
    position: { x: -250, y: 0, z: 32 }
  },
  {
    type: 'TEXT',
    text: 'Warp To Music World',
    width: 100,
    color: 0x000000,
    style: { width: '100px', fontSize: '16px', textAlign: 'center' },
    body: false,
    position: { x: -250, y: -30, z: 64 }
  },
  {
    type: 'TEXT',
    text: 'Warp To Platform World',
    color: 0x000000,
    width: 120,
    height: 200,
    style: { width: '120px', fontSize: '16px', textAlign: 'center' },
    body: false,
    position: { x: 250, y: 20, z: 64 }
  },
  {
    type: 'WARP',
    exit: { world: 'Platform' },
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,
    position: { x: 250, y: 0, z: 32 }
  },
  {
    type: 'WARP',
    exit: { world: 'Maze' },
    width: 64,
    height: 64,
    depth: 64,
    isStatic: true,
    isSensor: true,
    position: { x: -250, y: 250, z: 32 }
  },
  {
    type: 'TEXT',
    text: 'Maze World',
    width: 80,
    color: 0x000000,
    style: { width: '50px', fontSize: '16px', textAlign: 'center' },
    body: false,
    position: { x: -235, y: 280, z: 32 }
  },
  {
    type: 'WARP',
    exit: { world: 'GravityGardens' },
    width: 64,
    height: 64,
    depth: 64,
    isStatic: true,
    isSensor: true,
    position: { x: 250, y: 250, z: 32 }
  },
  {
    type: 'TEXT',
    text: 'Gravity Gardens',
    width: 80,
    color: 0x000000,
    style: { width: '100px', fontSize: '16px', textAlign: 'center' },
    body: false,
    position: { x: 240, y: 280, z: 32 }
  },
  {
    type: 'NOTE',
    color: 0xccff00,
    width: 32,
    height: 32,
    depth: 16,
    isStatic: true,
    position: { x: -120, y: -200, z: 32 }
  }
];
