export default function player() {
  let game = this.game;
  let player = this.game.createSutra();

  player.addCondition('isPlayer', (entity) => entity.type === 'PLAYER');

  player.addCondition('playerHealthBelow0', function (entity, gameState) {
    if (entity.type === 'PLAYER') {
      if (entity.health <= 0) {
        return true;
      }
    }
  });

  player.on('resetPlayerPosition', function (data, node) {
    // console.log('resetPlayerPosition', data, node)
    game.updateEntity({
      id: data.id,
      position: {
        x: 0,
        y: 0
      },
      velocity: {
        x: 0,
        y: 0
      },
      health: 100,
      color: 0x00ff00,
      score: 0
    });
  });

  player.on('damagePlayer', function (data, node) {
    let block = data.BLOCK;
    let player = data.PLAYER;

    player.health -= 10;
    game.updateEntity({
      id: player.id,
      health: player.health
    });
  });

  player.on('healPlayer', function (data, node) {
    let block = data.BLOCK;
    let player = data.PLAYER;

    if (player) {
      player.health += 5;
      game.updateEntity({
        id: player.id,
        health: player.health
      });
    }
  });

  return player;
}