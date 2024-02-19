export default function createTileMap(tileMap) {

  let game = this.game;

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

  // TODO: clean up this code path, createTileMap() should allow LABY or non-LABY instances
  // Maybe just config for Laby tilemap and non-Laby tilemap
  if (tileMap.algo) {

  }
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

  function tryUntilSuccess() {
    try {
      transformFn(map, tileMap.options || {});
    } catch (err) {
      console.log('Random seed cannot generate map with current map size and configuration', err.message);
      map.seedRandom(); // new seed
      tryUntilSuccess();
    }
  }

  tryUntilSuccess();

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

  if (this.tiledServer === false && this.proceduralGenerateMissingChunks === false) {

    if (exits.length === 0 && !is3DTileMap) { // TODO: add support for 3d doors and exits, easy
     // TODO: move this code into LABY
     // if no 6s ( EXIT ) exist, pick a random 2 ( FLOOR ) instead and make it an exit
     // if no 2s ( FLOOR ) exist, pick a random 0 ( VOID ) instead and make it an exit
     exits = generateExits(map, 1); // create a single exit, TOOD: configurable
    }

    if (entrances.length === 0 && !is3DTileMap) {
      // TODO: move this code into LABY
      // if no 5s ( ENTRANCE ) exist, pick a random 2 ( FLOOR ) instead and make it an entrance
      // if no 2s ( FLOOR ) exist, pick a random 0 ( VOID ) instead and make it an entrance
      entrances = generateEntrances(map, 1); // create a single entrance, TOOD: configurable
    }

  }

  this.createLayer(map, 16, 16); // TODO: tileSet.tilewidth, tileSet.tileheight

  this.game.emit('tilemap::created', tileMap);

  if (entrances.length > 0) {
    // pick random entrance using seed
    // let entrance = entrances[map.random(entrances.length - 1)];
    // picks random each time using Math.random
    // let entrance = entrances[Math.floor(Math.random() * entrances.length)];
    // use seeded random
    let entrance = entrances[map.random(entrances.length - 1)];
    let pos = this.calculateTilePosition(entrance, map, 16, 16); // TODO: tileSet.tilewidth, tileSet.tileheight
    if (typeof pos.x === 'number' && typeof pos.y === 'number') {
      // TODO: 3d space
      let currentPlayer = this.game.getCurrentPlayer();
      game.setPosition(currentPlayer.id, {
        x: pos.x,
        y: pos.y
      });
      // emit an event we can listen to in app space
      this.game.emit('player::tilemap::entrance', currentPlayer);
    }
  }

  return map;

}

function generateExits(map, exitCount) {
  let exits = [];
  // Find all spaces that are '2' FLOOR for potential exits
  let potentialExits = map.data.reduce((acc, val, idx) => {
    if (val === 2) acc.push(idx);
    return acc;
  }, []);

  let exit;
  if (potentialExits.length > 0) {
    // If there are '0's, pick a random one to be an exit
    // exit = potentialExits[Math.floor(Math.random() * potentialExits.length)];
    // use map.random()
    exit = potentialExits[map.random(potentialExits.length - 1)];
  } else {
    // If there are no '0's, consider a fallback strategy
    // For example, find all '3's (if '3' is a secondary choice for exits)
    let secondaryChoices = map.data.reduce((acc, val, idx) => {
      if (val === 0) acc.push(idx); // Assuming '0' VOID as secondary choice for an exit
      return acc;
    }, []);

    if (secondaryChoices.length > 0) {
      // If there are secondary choices, pick a random one
      // exit = secondaryChoices[Math.floor(Math.random() * secondaryChoices.length)];
      // use map.random()
      exit = secondaryChoices[map.random(secondaryChoices.length - 1)];
    } else {
      // If there are no '0's or secondary choices, fallback to picking a random index
      // This case might indicate an issue with the map generation or logic
      console.warn("No valid exit points (0 or 3) found in map.data.");
      // exit = Math.floor(Math.random() * map.data.length);
      // use map.random()
      exit = map.random(map.data.length - 1);
    }
  }

  // Set the selected index as an exit (6) and add it to the exits array
  map.data[exit] = 6;
  exits.push(exit);
  return exits;

}

function generateEntrances(map, entranceCount) {
  let entrances = [];
  // Find indexes of all '2's in the array
  let potentialEntrances = map.data.reduce((acc, val, idx) => {
    if (val === 2) acc.push(idx);
    return acc;
  }, []);

  let entrance;
  if (potentialEntrances.length > 0) {
    // If there are '2's, pick a random one to be an entrance
    // entrance = potentialEntrances[Math.floor(Math.random() * potentialEntrances.length)];
    // use map.random()
    entrance = potentialEntrances[map.random(potentialEntrances.length - 1)];
  } else {
    // If there are no '2's, find indexes of all '0's to pick a random one
    let zeros = map.data.reduce((acc, val, idx) => {
      if (val === 0) acc.push(idx);
      return acc;
    }, []);

    if (zeros.length > 0) {
      // entrance = zeros[Math.floor(Math.random() * zeros.length)];
      // use map.random()
      entrance = zeros[map.random(zeros.length - 1)];
    } else {
      // If there are no '0's either, fallback to picking a random index
      // This case might indicate an issue with the map generation or logic
      console.warn("No valid entrance points (0 or 2) found in map.data.");
      // entrance = Math.floor(Math.random() * map.data.length);
      // use map.random()
      entrance = map.random(map.data.length - 1);
    }
  }

  // Set the selected index as an entrance (5) and add it to the entrances array
  map.data[entrance] = 5;
  entrances.push(entrance);
  return entrances;
}