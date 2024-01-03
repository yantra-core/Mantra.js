// Tile.js - Marak Squires 2023
// Implements support for Tiled JSON maps via the Tiled JSON format
// see: https://doc.mapeditor.org/en/stable/reference/json-map-format/
import defaultOrthogonalMap from './maps/defaultOrthogonalMap.js';

let tilemap = {
  1: 'block',
  2: 'grass',
  3: 'water'
};

class Tile {
  static id = 'tile';
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Tile.id;
  }

  init(game) {
    this.game = game;

    // console.log('Tile.init()');
    let defaultTileSet = defaultOrthogonalMap;
    let that = this;
    setTimeout(function(){
      that.createTileMapFromTiledJSON(defaultTileSet);

    }, 222)
  }

  createTileMapFromTiledJSON(tiledJSON) {
    // Assuming the JSON data is already parsed into a JavaScript object
    const mapData = tiledJSON;

    // Create a container for the map
    const mapContainer = document.createElement('div');
    mapContainer.style.position = 'relative';
    mapContainer.style.width = mapData.width * mapData.tilewidth + 'px';
    mapContainer.style.height = mapData.height * mapData.tileheight + 'px';

    // Process each layer
    mapData.layers.forEach(layer => {
      // Only process if it's a tile layer
      if (layer.type === 'tilelayer') {
        this.createLayer(mapContainer, layer, mapData.tilewidth, mapData.tileheight);
      }
    });

    // Append the map container to the body or a specific element
    document.body.appendChild(mapContainer);
  }

  createLayer(container, layer, tileWidth, tileHeight) {
    layer.data.forEach((tileId, index) => {
      if (tileId !== 0 && tileId !== 2) { // for now
        let scale = 1;
        scale = 1;
        // console.log('cccc', tileId, index)
        
        let x = (index % layer.width) * tileWidth;
        let y = Math.floor(index / layer.width) * tileHeight;
        let z = -10;

        // these x y assume 0,0, shift the coords to center since map goes negative
        x = x - (layer.width * tileWidth / 2);
        y = y - (layer.height * tileHeight / 2);

        let height = tileHeight;
        let width = tileWidth;

        // apply scale
        x = x * scale;
        y = y * scale;
        height = height * scale;
        width = width * scale;

        let body = false;
        let isStatic = true;
        let mass = 1;

        if (tileId === 1) {
          body = true;
          mass = 5000;
          isStatic = false;
          z = 16;
        }

        // console.log("placing at", x, y)
        let ent = this.game.createEntity({
          // id: 'tile' + index,
          type: 'BLOCK',
          kind: 'Tile', // for now
          body: body,
          mass: mass,
          isStatic: isStatic,
          position: {
            x: x,
            y: y,
            z: z
          },
          friction: 1,
          frictionAir: 1,
          frictionStatic: 1,
          // color: 0x00ff00,
          texture: 'tile-' + tilemap[tileId],
          // Remark: we could support path'd textures here; however some engines,
          // like Phaser require we preload the textures before we can use them
          // this can be solved by adding a formalized asset preloader to the game
          // texture: 'img/game/tiles/' + tileId + '.png',
          width: width,
          height: height,
          depth: width
          // depth: width
          // tileId: tileId
        })
        // console.log("ent", ent)
        /*
        const tile = document.createElement('div');
        tile.style.width = tileWidth + 'px';
        tile.style.height = tileHeight + 'px';
        tile.style.position = 'absolute';
        tile.style.left = (index % layer.width) * tileWidth + 'px';
        tile.style.top = Math.floor(index / layer.width) * tileHeight + 'px';

        // Apply background image based on tileId - this needs a mapping from tileId to image
        // For simplicity, let's assume a function getTileImageURL(tileId) that returns the image URL
        tile.style.backgroundImage = `url('${this.getTileImageURL(tileId)}')`;

        container.appendChild(tile);
        */
      }
    });
  }

  getTileImageURL(tileId) {
    // Placeholder function: implement mapping of tileId to actual image URLs
    // For example, return 'path/to/image' + tileId + '.png';
    return 'img/game/tiles/' + tileId + '.png';
  }


  update() {
  }

  render() { }

  destroy() { }

}

export default Tile;