export default function createTile(tile, x, y, z, tileWidth, tileHeight, color) {

  let tileId = tile.id;

  // TODO: better tile config by kind
  // for now
  z = -16;

  const scale = 1;

  let body = false;
  let isStatic;
  let mass;

  /*
  if (tile.body) {
    body = true;
    isStatic = false;
    mass = 1;
  }
  */

  let _color;
  if (color) {
    _color = color;
  }
  // body = false;
  let _texture = `tile-${this.tilemap[tileId]}`; // rename
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