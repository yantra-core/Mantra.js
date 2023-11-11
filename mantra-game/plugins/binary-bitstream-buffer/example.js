import PlayerCodec from './bbb.js';

// Usage example
let playerData = {
  id: 123,
  type: 'PLAYER',
  rotation: null,
  position: { x: 0, y: 100 },
  velocity: { x: 10.2, y: 9.2 }
};

let playerCodec = new PlayerCodec();

// Encoding the player
let finalBuffer = playerCodec.encodePlayer(playerData);

// Decoding the player later
let decodedPlayer = playerCodec.decodePlayer(finalBuffer);
console.log(decodedPlayer);