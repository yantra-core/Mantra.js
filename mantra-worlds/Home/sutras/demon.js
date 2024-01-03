export default function demon(game) {

  game.createEntity({
    type: 'NPC',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 64,
    position: {
      x: -60,
      y: -60,
      z: 32
    }
  });

  game.createEntity({
    type: 'NPC',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 64,
    position: {
      x: 64,
      y: -60,
      z: 32
    }
  });


}