// Collectable.js - Marak Squires 2024
// Handles `Entity.items` after they are added / collectable to Entity
class Collectable {
  static id = 'collectable';
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = Collectable.id;
  }

  init(game) {
    this.game = game;
    // add system
    this.game.systemsManager.addSystem(this.id, this);
  }

  update() {
    // console.log('Collectable.update()');
    // TODO: iterate only through ents that are collectable
    // then get their parent reference? must keep time complexity low
    // TODO: for now just iterate through all items components
    // if (this.game.tick % 10) {

    let itemsData = this.game.components.items.data;
    // TODO: see why these are null, don't allow null items into component data

    // for each entity that has items, iterate those items and set position to relative of parent
    for (let id in itemsData) {
      let parentEnt = this.game.entities.get(Number(id));
      //console.log('parentEnt', parentEnt)
      if (!parentEnt || parentEnt.type === 'CONTAINER') {
        //skip
        continue;
      }

      let childEnts = itemsData[id];
      // console.log("childEnts", childEnts)
      childEnts.forEach((childEntId) => {
        // TODO: only get positional component data, not entire ent
        let entity = this.game.entities.get(childEntId);
        if (entity) {
          // console.log('found a child entity with items', entity);

          // adjust the position relative to the parent ent, attach for now
          this.game.updateEntity({
            id: entity.id,
            body: false, // TODO: does this work?
            // rotation: parentEnt.rotation,
            position: {
              x: parentEnt.position.x + 10,
              y: parentEnt.position.y
            }
          });

        }
      });
    }

    // }
  }

  render() { }

  destroy() { }

}

export default Collectable;