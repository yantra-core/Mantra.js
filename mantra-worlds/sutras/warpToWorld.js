export default function warpToWorld (game) {
 
  let rules = game.createSutra();

  rules.addCondition('playerTouchedWarpZone', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
      if (entity.PLAYER && entity.WARP) {
        return true;
      }
    }
  });  
  rules
    .if('playerTouchedWarpZone')
    .then('switchWorld')

  rules.on('switchWorld', (entity) => {
    let worldName = entity.WARP.kind || 'Home';
    game.switchWorlds(worldName);
  });

  return rules;

}