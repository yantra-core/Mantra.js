export default function createTileMap(tileMap) {
  let labyrinthos = this.labyrinthos;
  console.log('createTileMap', tileMap);

  let incomingDepth = parseInt(tileMap.depth);
  let map = new labyrinthos.TileMap({
    x: 0,
    y: 0,
    width: parseInt(tileMap.width),
    height: parseInt(tileMap.height),
    //depth: parseInt(tileMap.depth),
    tileWidth: 16, // TODO: tileSet.tilewidth
    tileHeight: 16 // TODO: tileSet.tileheight
  });
  map.fill(1);

  // console.log('confirm', map.data)
  map.seed(tileMap.seed);
  this.labySeed = tileMap.seed;

  let transformFn = labyrinthos.mazes[tileMap.algo];
  let transformType = 'maze';
  let is3D = false;

  if (typeof transformFn === 'undefined') {
    transformFn = labyrinthos.terrains[tileMap.algo];
    transformType = 'terrain';
  }
  if (typeof transformFn === 'undefined') {
    transformFn = labyrinthos.shapes[tileMap.algo];
    transformType = 'shape';
  }

  /*
  let try3D = tileMap.algo + '3D';
  if (typeof labyrinthos.mazes[try3D] !== 'undefined') {
    transformFn = labyrinthos.mazes[try3D];
    transformType = 'maze';
    is3D = true;
  }
  */

  if (typeof transformFn === 'undefined') {
    console.log('no transformFn found for', tileMap.algo);
    throw new Error('no transformFn found for ' + tileMap.algo);
  }

  transformFn(map, tileMap.options || {});

  if (transformType === 'terrain') {
    map.scaleToTileRange(6);
  }

  // default `extrude` mode
  if (incomingDepth > 1 && typeof map.data[0] !== 'object') { // if not already 3d array
    // simply clone each layer to fill the depth dimension
    // this is used to fill algos which can't yet generate 3d maps
    let layer = map.data;

    map.data = [];
    for (let i = 0; i < incomingDepth; i++) {
      map.data[i] = [];
      for (let j = 0; j < layer.length; j++) {
        map.data[i][j] = layer[j];
      }
      //map.data.push(JSON.parse(JSON.stringify(layer)));
    }
  }

  this.createLayer(map, 16, 16); // TODO: tileSet.tilewidth, tileSet.tileheight

  this.game.emit('tilemap::created', tileMap);

}
