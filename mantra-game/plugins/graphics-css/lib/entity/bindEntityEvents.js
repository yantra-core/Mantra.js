export default function bindEntityEvents(entityData, entityElement) {

  let game = this.game;
  // console.log('inflateBox', entityData.type, entityElement.style.zIndex)
  entityElement.addEventListener('pointerdown', (ev) => {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    let ent = game.getEntity(entityData.id);
    game.emit('pointerDown', ent, ev);
  });

  entityElement.addEventListener('pointerup', (ev) => {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    let ent = game.getEntity(entityData.id);
    game.emit('pointerUp', ent, ev);
  });

  entityElement.addEventListener('pointermove', (ev) => {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    let ent = game.getEntity(entityData.id);
    game.emit('pointerMove', ent, ev);
  });

}