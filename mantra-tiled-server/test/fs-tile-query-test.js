import tap from 'tap';
import getChunkFiles from '../lib/getChunkFiles.js';
import path from 'path';

tap.test('getChunkFiles function', t => {
  const gridSize = 16; // Grid size
  const outputDir = 'test/output'; // Mock output directory
  const playerPosition = { x: 0, y: 0 }; // Mock player position
  const buffer = 1; // Buffer range
  const expectedFilePaths = [
    'test/output/chunk_x-16_y-16.js',
    'test/output/chunk_x-16_y0.js',
    'test/output/chunk_x-16_y16.js',
    'test/output/chunk_x0_y-16.js',
    'test/output/chunk_x0_y0.js',
    'test/output/chunk_x0_y16.js',
    'test/output/chunk_x16_y-16.js',
    'test/output/chunk_x16_y0.js',
    'test/output/chunk_x16_y16.js',
  ];

  const result = getChunkFiles(playerPosition, gridSize, outputDir, buffer);

  t.same(result.sort(), expectedFilePaths.sort(), 'Should return correct file paths for chunks');

  t.end();
});
