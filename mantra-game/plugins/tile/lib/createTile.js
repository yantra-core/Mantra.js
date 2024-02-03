export default function createTile(tile, x, y, z = 0, tileWidth, tileHeight, tileDepth, color, customZ = true) {

  let tileId = tile.id;

  if (tile.kind === 'empty') {
    return;
  }

  // overrides for tile z position, used for 2.5D games
  if (customZ && typeof tile.z === 'number') {
    z = tile.z;
  }

  // overrides for tile size
  if (tile.size && typeof tile.size.width === 'number') {
    tileWidth = tile.size.width;
  }
  if (tile.size && typeof tile.size.height === 'number') {
    tileHeight = tile.size.height;
  }

  if (tile.size && typeof tile.size.depth === 'number') {
    tileDepth = tile.size.depth;
  } else {
    tileDepth = tileHeight;
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

  let _type = 'TILE';
  if (tile.kind === 'bush' || tile.kind === 'tree' || tile.kind === 'block') {
    // _type = 'BLOCK';
  }

  if (customZ) {
    // this is required so don't dont stack 2d bodies inside each other in 2.5D space
    body = false;
  }
  let _texture = `tile-${tile.kind}`; // rename
  let ent = this.game.createEntity({
    type: _type,
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
    depth: tileDepth * scale
  });
  return ent;
}