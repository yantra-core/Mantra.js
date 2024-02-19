// TODO: needs to be able to attach by container/entity id or name, not just by name
export default function layoutEntity(container, entityId) {

  let containerEnt = this.game.findEntity(container); // Adjust this line to match how you access the boss entity

  if (!containerEnt) {
    throw new Error('Container not found: ' + container);
  }
  let containerPosition = containerEnt.position || { x: 0, y: 0, z: 0 };
  // console.log('found container ent to work with', containerEnt);

  let layoutType = 'none'; // 'none', 'grid', 'flex', 'stack', 'custom-function'
  let origin = 'center'; // 'center', 'bottom-right', 'top-right', 'bottom-left', 'center-left', 'center-right', 'top-center', 'bottom-center', 'top-left'

  if (containerEnt.style && containerEnt.style.layout) {
    layoutType = containerEnt.style.layout;
  }

  if (containerEnt.style && containerEnt.style.origin) {
    origin = containerEnt.style.origin;
  }

  //
  // Add the current new entity id to the container items
  //
  if (!containerEnt.items) {
    containerEnt.items = [];
  }
  containerEnt.items.push(entityId); // Remark: We are not saving the associations here?

  //
  // Default / no layout indicates relative position from top left origin ( -1, -1 )
  // Remark: May want to add custom origins such as center ( 0, 0 ) or bottom right ( 1, 1 ), etc
  //
  if (layoutType === 'none') {
    // Retrieve the entity to be positioned
    let entity = this.game.getEntity(entityId);

    // Check if entity exists
    if (!entity) {
      console.error('Entity not found: ' + entityId);
      return;
    }

    // Optional: Define offsets from the container's top-left corner
    let offsetX = 0; // Adjust as needed
    let offsetY = 0; // Adjust as needed


    if (origin === 'top-left') {
      // offset to be calculated by size of container and size of entity
      offsetX = -containerEnt.size.width / 2;
      offsetY = -containerEnt.size.height / 2;
    }


    // Calculate the entity's new position relative to the container's position
    let newPosition = {
      x: containerPosition.x + offsetX,
      y: containerPosition.y + offsetY,
      z: containerPosition.z // Assuming z-index remains constant or is managed elsewhere
    };

    // Update the entity's position
    this.game.updateEntity({ id: entityId, position: newPosition });

    // Log for debugging purposes
    console.log(`Entity ${entityId} positioned at (${newPosition.x}, ${newPosition.y}, ${newPosition.z}) relative to container`);
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
    // Remark: use components api to only fetch the necessary components ( instead of entire ent )
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

      // console.log(`Item ${item.id} positioned at row ${row}, column ${col}`);
    });

    // console.log('adding item to container using grid layout algorithm');
  }

  //
  // Layout container items using stack layout algorithm
  //
  if (layoutType === 'stack') {
    // Define stack offset values
    let stackOffsetX = 0; // Horizontal offset for each stacked item
    let stackOffsetY = 5; // Vertical offset for each stacked item


    // Retrieve the entity to be positioned
    let entity = this.game.getEntity(entityId);

    // Check if entity exists
    if (!entity) {
      console.error('Entity not found: ' + entityId);
      return;
    }

    // TODO: we could add multiple ways to stack here by cardinal direction or custom function
    // default stack top to bottom using entity size
    stackOffsetY = entity.size.height + 5;


    // Determine the stack position based on the number of items already in the container
    let stackIndex = containerEnt.items.length - 1; // -1 because we've already added the new entityId to containerEnt.items

    // Calculate the entity's new position based on stack index and offsets
    let newPosition = {
      x: containerPosition.x + stackIndex * stackOffsetX,
      y: containerPosition.y + stackIndex * stackOffsetY,
      z: containerPosition.z // Assuming z-index remains constant or is managed elsewhere
    };

    // Update the entity's position
    this.game.updateEntity({ id: entityId, position: newPosition });

    // Log for debugging purposes
    console.log(`Entity ${entityId} stacked at index ${stackIndex} with position (${newPosition.x}, ${newPosition.y}, ${newPosition.z}) relative to container`);
  }

  //
  // Layout container items using custom function
  //
  if (typeof layoutType === 'function') {
    console.log('adding item to container using custom layout algorithm');
    throw new Error('Custom layout algorithm functions are yet implemented!')
  }

}