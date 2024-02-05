export default function createTileMap(tileMap) {
  let labyrinthos = this.labyrinthos;
  // console.log('createTileMap', tileMap);

  if (typeof tileMap.x !== 'number') {
    tileMap.x = 0;
  }
  if (typeof tileMap.y !== 'number') {
    tileMap.y = 0;
  }
  
  let incomingDepth = parseInt(tileMap.depth);

  let map = new labyrinthos.TileMap({
    x: tileMap.x,
    y: tileMap.y,
    width: parseInt(tileMap.width),
    height: parseInt(tileMap.height),
    //depth: parseInt(tileMap.depth),
    tileWidth: 16, // TODO: tileSet.tilewidth
    tileHeight: 16 // TODO: tileSet.tileheight
  });

  map.fill(1);

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

  let entrances = [];
  let exits = [];

  let is3DTileMap = false;
  // default `extrude` mode
  if (incomingDepth > 1 && typeof map.data[0] !== 'object') { // if not already 3d array
    // simply clone each layer to fill the depth dimension
    // this is used to fill algos which can't yet generate 3d maps
    let layer = map.data;
    is3DTileMap = true;

    map.data = [];
    for (let i = 0; i < incomingDepth; i++) {
      map.data[i] = [];
      for (let j = 0; j < layer.length; j++) {
        map.data[i][j] = layer[j];
        if (layer[j] === 5) {
          entrances.push(j); // find an entrance since we are O(n) here already
        }
        if (layer[j] === 6) {
          exits.push(j); // find an exit since we are O(n) here already
        }
      }
      //map.data.push(JSON.parse(JSON.stringify(layer)));
    }
  } else {
    // needs to find the entrance in 2d map
    let layer = map.data;
    for (let j = 0; j < layer.length; j++) {
      if (layer[j] === 5) {
        entrances.push(j); // 5 is the entrance, 6 is exit
      }
      if (layer[j] === 6) {
        exits.push(j); // 5 is the entrance, 6 is exit
      }
    }
  }

  if (exits.length === 0) {
    // pick a random item in the array that is 0 and make it an exit
    let exit;
    
    if (is3DTileMap) {
      exit = map.random(map.data.length - 1); // TODO: better random 3D exit
    } else {

      // find all spaces that are 0
      let spaces = [];
      for (let i = 0; i < map.data.length; i++) {
        if (map.data[i] === 0) {
          spaces.push(i);
        }
      }

      exit = map.random(spaces.length - 1);
    }
    map.data[exit] = 6;

    exits.push(exit);
  }

  if (entrances.length === 0) {
    // pick a random item in the array that is 0 and make it an entrance
    let entrance = map.random(map.data.length - 1);
    map.data[entrance] = 5;
    entrances.push(entrance);
  }
  
  this.createLayer(map, 16, 16); // TODO: tileSet.tilewidth, tileSet.tileheight

  this.game.emit('tilemap::created', tileMap);

  if (entrances.length > 0) {
    // pick random entrance using seed
    // let entrance = entrances[map.random(entrances.length - 1)];
    // picks random each time using Math.random
    let entrance = entrances[Math.floor(Math.random() * entrances.length)];
    let pos = this.calculateTilePosition(entrance, map, 16, 16); // TODO: tileSet.tilewidth, tileSet.tileheight
    if (typeof pos.x === 'number' && typeof pos.y === 'number') {
      // TODO: 3d space
      let currentPlayer = this.game.getCurrentPlayer();
      console.log('currentPlayer', currentPlayer)
      game.setPosition(currentPlayer.id, {
        x: pos.x,
        y: pos.y
      });
    }
  }

  return map;

}