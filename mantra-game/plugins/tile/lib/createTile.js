export default function createTile(tile, x, y, z, tileWidth, tileHeight, color) {

  let tileId = tile.id;

  if (tile.kind === 'empty') {
    return;
  }

  // TODO: better tile config by kind
  // for now

  if (typeof tile.z === 'number') {
    z = tile.z;
  } else{
    z = -16;
  }

  let isStatic;

  if (typeof tile.isStatic === 'boolean') {
    isStatic = tile.isStatic;
  }

  const scale = 1;
  let body = tile.body;
  let mass = tile.mass || 1

  let _color;
  if (color && this.debug) {
    _color = color;
  }

  let _texture = `tile-${tile.kind}`; // rename
  this.game.createEntity({
    type: 'Tile',
    kind: tile.kind,
    body,
    mass,
    // Remark: By default we will disable all collision events for Tiles
    //         This is done universally for performance reasons
    //         Each tile.kind could be configured via `TileSet` class with custom collision config
    collisionActive: false,
    collisionStart: false,
    collisionEnd: false,
    // set friction high so they dont' glide around on push
    friction: 100,
    frictionAir: 100,
    frictionStatic: 100,
    isStatic,
    style: { cursor: 'pointer' },
    position: { x: x * scale, y: y * scale, z: z * scale },
    friction: 1,
    frictionAir: 1,
    frictionStatic: 1,
    texture: _texture,
    color: _color,
    width: tileWidth * scale,
    height: tileHeight * scale,
    depth: tileWidth * scale
  });
}