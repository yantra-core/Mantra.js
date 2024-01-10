export default function gameOfLife(game) {
  const GRID_SIZE = 150; // Define the size of the grid
  const CELL_SIZE = 5;  // Size of each cell

  // Initialize grid cells
  for (let x = 0; x < GRID_SIZE; x += CELL_SIZE) {
    for (let y = 0; y < GRID_SIZE; y += CELL_SIZE) {
      game.createEntity({
        type: 'LIFE_CELL',
        //health: Math.random() < 0.5 ? 1 : 2, // 1 is alive, 2 is dead
        health: 2,
        position: { x, y },
        body: false,
        width: CELL_SIZE,
        height: CELL_SIZE
      });
    }
  }

  function initializeGlider(x, y, cellSize, game) {
    game.createEntity({ type: 'LIFE_CELL', width: cellSize, height: cellSize, body: false, health: 1, position: { x: x, y: y } });
    game.createEntity({ type: 'LIFE_CELL', width: cellSize, height: cellSize, body: false, health: 1, position: { x: x + cellSize, y: y } });
    game.createEntity({ type: 'LIFE_CELL', width: cellSize, height: cellSize, body: false, health: 1, position: { x: x + 2 * cellSize, y: y } });
    game.createEntity({ type: 'LIFE_CELL', width: cellSize, height: cellSize, body: false, health: 1, position: { x: x + 2 * cellSize, y: y - cellSize } });
    game.createEntity({ type: 'LIFE_CELL', width: cellSize, height: cellSize, body: false, health: 1, position: { x: x + cellSize, y: y - 2 * cellSize } });
  }
  initializeGlider(100, 100, CELL_SIZE, game);
  let rules = game.createSutra();

  // Rule for updating cell state
  rules.if('updateCellState').then('transitionCellState');
  rules.addCondition('updateCellState', (entity, gameState) => {
    return entity.type === 'LIFE_CELL' && gameState.tick % 10 === 0; // Update every 2 ticks
  });
  rules.on('transitionCellState', (entity, node, gameState) => {
    const neighbors = getNeighbors(entity, node, gameState); // Function to get neighboring cells
    const aliveNeighbors = neighbors.filter(neighbor => neighbor.health === 1).length;


    // console.log(neighbors, aliveNeighbors)
    // Game of Life rules
    if (entity.health === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
      //entity.state = 'dead';
      entity.health = 0;
    } else if (entity.health === 2 && aliveNeighbors === 3) {
      entity.health = 1;
      //entity.state = 'alive';
    }

    // Update entity in the game
    game.updateEntity({
      id: entity.id,
      health: entity.health,
      style: {
        backgroundColor: entity.health === 1 ? 'green' : 'black'
      }
    });


  });

  return rules;
}

function getNeighbors(cell, node, gameState) {
  const gridSize = 150; // Define the size of the grid
  const cellSize = 5; // Assuming each cell has a fixed size

  let neighbors = [];
  const neighborOffsets = [
    { x: -cellSize, y: -cellSize }, { x: 0, y: -cellSize }, { x: cellSize, y: -cellSize },
    { x: -cellSize, y: 0 }, /* Current Cell */ { x: cellSize, y: 0 },
    { x: -cellSize, y: cellSize }, { x: 0, y: cellSize }, { x: cellSize, y: cellSize }
  ];

  gameState.ents.LIFE_CELL.forEach(function (otherCell) {
    for (let offset of neighborOffsets) {
      let wrappedX = (cell.position.x + offset.x + gridSize) % gridSize;
      let wrappedY = (cell.position.y + offset.y + gridSize) % gridSize;

      if (otherCell.position.x === wrappedX && otherCell.position.y === wrappedY) {
        neighbors.push(otherCell);
        break; // Found neighbor, no need to check other offsets
      }
    }
  });

  return neighbors;
}



