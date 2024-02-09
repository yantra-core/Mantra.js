export default function layoutEntity (container, entityId) {
  console.log('attemping to add to container');

  let containerEnt = this.game.findEntity(container); // Adjust this line to match how you access the boss entity

  if (!containerEnt) {
    throw new Error('Container not found: ' + container);
  }
  let containerPosition = containerEnt.position;
  console.log('found container ent to work with', containerEnt);

  let layoutType = 'none';

  if (containerEnt.style && containerEnt.style.layout) {
    layoutType = containerEnt.style.layout;
  }

  //
  // Add the current new entity id to the container items
  //
  containerEnt.items.push(entityId);

  //
  // Default / no layout indicates relative position from top left origin ( -1, -1 )
  // Remark: May want to add custom origins such as center ( 0, 0 ) or bottom right ( 1, 1 ), etc
  //
  if (layoutType === 'none') {
    // console.log('adding item to container using relative position with no layout algorithm');
    // adjust the absolute position about to be set to the container relative position
    position.x = position.x + containerPosition.x;
    position.y = position.y + containerPosition.y;
  }

  //
  // Layout container items using grid layout algorithm
  //
  if (layoutType === 'grid') {
    let cols = containerEnt.style.grid.columns;
    let rows = containerEnt.style.grid.rows;

    if (typeof cols !== 'number' || typeof rows !== 'number') {
      console.log('containerEnt.layout', containerEnt.layout);
      throw new Error('Grid layout requires cols and rows to be numbers');
    }

    // get all the other items in the container
    let containerItems = containerEnt.items || [];

    // call game.getEntity() for each item to get its size and position
    // TODO: use components api to only fetch the necessary components ( instead of entire ent )
    containerItems = containerItems.map((itemId) => {
      return this.game.getEntity(itemId);
    });

    let containerSize = containerEnt.size;

    // Calculate the width and height for each grid cell
    let cellWidth = containerSize.width / cols;
    let cellHeight = containerSize.height / rows;

    // Loop through each item in the container
    containerItems.forEach((item, index) => {
      // Calculate the row and column for the current item based on its index
      let row = Math.floor(index / cols);
      let col = index % cols;

      // skip if item is not found
      if (!item) {
        // Remark: This should *not* happen, investigate why index is null value
        console.log('warning: item not found in container', index, item)
        return;
      }

      let paddingTop = containerEnt.style.paddingTop || 20;
      let paddingLeft = containerEnt.style.paddingLeft || -10;

      // Set the starting position to the top-left corner of the container's bounding box
      let positionX = containerPosition.x - containerSize.width / 2 + paddingLeft;
      let positionY = containerPosition.y - containerSize.height / 2 + paddingTop;
      let positionZ = containerPosition.z;

      // Calculate the position for the current item, aligning the center of the entity with the center of the grid cell
      let itemPosition = {
        x: positionX + (col * cellWidth) + (cellWidth / 2), // Center of the grid cell
        y: positionY + (row * cellHeight) + (cellHeight / 2), // Center of the grid cell
        z: item.position.z // Assuming z-index remains constant or is managed elsewhere
      };

      // Update the entity's position using the game framework's method
      this.game.updateEntity({ id: item.id, position: itemPosition });

      console.log(`Item ${item.id} positioned at row ${row}, column ${col}`);
    });

    console.log('adding item to container using grid layout algorithm');
  }

  //
  // Layout container items using custom function
  //
  if (typeof layoutType === 'function') {
    console.log('adding item to container using custom layout algorithm');
    throw new Error('Custom layout algorithm functions are yet implemented!')
  }

}