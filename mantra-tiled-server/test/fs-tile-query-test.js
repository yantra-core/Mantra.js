import tap from 'tap';
import normalizeQuery from '../lib/normalizeQuery.js';
import getChunkFiles from '../lib/getChunkFiles.js';
import path from 'path';

tap.test('normalizeQuery function', t => {
  const gridSize = 16; // Assuming a grid size of 16x16
  const queries = [
    { x: 10, y: 10, width: 20, height: 20, expected: { minX: 0, minY: 0, maxX: 32, maxY: 32 } },
    // Add more test cases as needed
  ];

  queries.forEach(query => {
    const result = normalizeQuery(query, gridSize);
    t.same(result, query.expected, `Query ${JSON.stringify(query)} should be normalized to ${JSON.stringify(query.expected)}`);
  });

  t.end();
});

tap.test('getChunkFiles function', t => {
  const gridSize = 16; // Grid size
  const outputDir = 'test/output'; // Mock output directory
  const normalizedQuery = { minX: 0, minY: 0, maxX: 32, maxY: 32 };
  const expectedFilePaths = [
    path.join(outputDir, 'chunk_x0_y0.js'),
    path.join(outputDir, 'chunk_x0_y16.js'),
    path.join(outputDir, 'chunk_x16_y0.js'),
    path.join(outputDir, 'chunk_x16_y16.js'),
  ];

  const result = getChunkFiles(normalizedQuery, gridSize, outputDir);
  
  t.same(result, expectedFilePaths, 'Should return correct file paths for chunks');
  
  t.end();
});