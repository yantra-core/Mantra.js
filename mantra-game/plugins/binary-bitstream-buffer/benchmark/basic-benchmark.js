import { performance } from 'perf_hooks';

import api from "../lib/index.js";
import snapshotSchema from "../test/fixtures/testSchema.js";

let id = 1;
let name = 'Bunny';
let type = 'PLAYER';
let staticItem = {
  id,
  name,
  type,
  position: { x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) },
  velocity: { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) },
  width: Math.floor(Math.random() * 100),
  height: Math.floor(Math.random() * 100),
  rotation: Math.floor(Math.random() * 360),
  mass: Math.floor(Math.random() * 100),
  health: Math.floor(Math.random() * 100),
  depth: Math.random() * 100,
  lifetime: Math.floor(Math.random() * 1000),
  radius: Math.random() * 100,
  isSensor: Math.random() < 0.5,
  isStatic: Math.random() < 0.5,
  destroyed: Math.random() < 0.5,
  owner: Math.floor(Math.random() * 10),
  maxSpeed: Math.floor(Math.random() * 100)
};
// Function to generate a player with random data
function generateRandomPlayer(id, name, type) {
  return staticItem;
}

// Benchmark function
function runBenchmark(iterations) {
  // Generate data outside the timed section
  let testData = [];

  let totalEncodeTime = 0;
  let totalDecodeTime = 0;

  for (let i = 0; i < iterations; i++) {
    let players = [];
    for (let j = 0; j < 10; j++) {
      players.push(generateRandomPlayer(j + 1, 'Player' + (j + 1), 'PLAYER'));
    }

    testData.push({
      id: i,
      state: players
    });
  }

  console.time('Total Benchmark Test');

  testData.forEach(snapshot => {
    let startEncode = performance.now();
    let encoded = api.encode(snapshotSchema, snapshot);
    totalEncodeTime += performance.now() - startEncode;
  });

  testData.forEach(snapshot => {
    let encoded = api.encode(snapshotSchema, snapshot); // Re-encode for decoding
    let startDecode = performance.now();
    let decoded = api.decode(snapshotSchema, encoded);
    totalDecodeTime += performance.now() - startDecode;
  });

  console.timeEnd('Total Benchmark Test');

  console.log(`Average Encoding Time: ${(totalEncodeTime / iterations).toFixed(2)}ms`);
  console.log(`Average Decoding Time: ${(totalDecodeTime / iterations).toFixed(2)}ms`);
}

// Run the benchmark
runBenchmark(100); // Adjust the number of iterations as needed
