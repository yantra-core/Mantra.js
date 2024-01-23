import tap from 'tape';
import tileQuery from '../lib/tileQuery.js';

// Mock Tiled map data with various chunks
const mockTiledMap = {
  layers: [{
    chunks: [
      { x: -64, y: -64, width: 16, height: 16, data: [] }, // Outside Area
      { x: -16, y: -16, width: 16, height: 16, data: [] }, // Area boundary
      { x: 0, y: 0, width: 16, height: 16, data: [] },     // Inside query area
      { x: 16, y: 16, width: 16, height: 16, data: [] },   // Area boundary
      { x: -8, y: -8, width: 16, height: 16, data: [] },   // Partially intersecting
      { x: 8, y: 8, width: 16, height: 16, data: [] },     // Partially intersecting
    ]
  }]
};

tap.test('tileQuery function', t => {
  const query = { x: 0, y: 0, width: 32, height: 32 };

  const result = tileQuery(mockTiledMap, query);
  t.equal(Array.isArray(result), true, 'Result should be an array');
  // Update the expected number of chunks
  t.equal(result.length, 5, 'Result should contain five chunks');
  
  // Test to ensure the correct chunks are returned
  // Update this list to include the positions of all chunks that should be included
  const expectedChunksPositions = [
    { x: 0, y: 0 },      // Inside query area
    { x: -8, y: -8 },    // Partially intersecting
    { x: 8, y: 8 },      // Partially intersecting
    { x: -16, y: -16 },  // Area boundary
    { x: 16, y: 16 }     // Area boundary
  ];
  expectedChunksPositions.forEach(pos => {
    t.ok(result.some(chunk => chunk.x === pos.x && chunk.y === pos.y),
         `Chunk at x: ${pos.x}, y: ${pos.y} should be included`);
  });

  t.end();
});