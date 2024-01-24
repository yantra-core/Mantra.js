export default function createTile(tile, x, y, z, tileWidth, tileHeight, color) {

  let tileId = tile.id;

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
  if (color) {
    _color = color;
  }

  let _texture = `tile-${tile.kind}`; // rename
  this.game.createEntity({
    type: 'BLOCK',
    kind: 'Tile',
    body,
    mass,
    isStatic,
    style: { cursor: 'pointer' },
    position: { x: x * scale, y: y * scale, z },
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