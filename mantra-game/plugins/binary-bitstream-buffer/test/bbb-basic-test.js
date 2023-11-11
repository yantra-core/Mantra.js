import tap from 'tap';
import PlayerCodec from '../api.js';

// Test encoding and decoding a single player
tap.test('Encode and Decode Single Player', async (t) => {
  const playerCodec = new PlayerCodec();
  const playerData = {
    id: 123,
    type: 'PLAYER',
    rotation: null,
    position: { x: 0, y: 100 },
    velocity: { x: 10.2, y: 9.2 }
  };

  const finalBuffer = playerCodec.encodePlayer(playerData);
  const decodedPlayer = playerCodec.decodePlayer(finalBuffer);
  console.log('dddd', decodedPlayer, playerData)
  t.equal(decodedPlayer.id, playerData.id, 'ID matches');
  t.equal(decodedPlayer.type, playerData.type, 'Type matches');
  t.notOk(decodedPlayer.rotation, 'Rotation should be null or undefined');
  t.same(decodedPlayer.position, playerData.position, 'Position matches');
  t.same(decodedPlayer.velocity, playerData.velocity, 'Velocity matches');
  t.end();
});

// Test encoding and decoding multiple players
tap.test('Encode and Decode Multiple Players', async (t) => {
  const playerCodec = new PlayerCodec();

  let players = [
    {
      id: 1,
      type: 'PLAYER',
      position: { x: 10, y: 20 },
      velocity: { x: 1, y: 1.5 },
      rotation: 0
    },
    {
      id: 2,
      type: 'PLAYER',
      position: { x: 30, y: 40 },
      velocity: { x: 2, y: 2.5 },
      rotation: 1.57
    },
    {
      id: 3,
      type: 'PLAYER',
      position: { x: 50, y: 60 },
      velocity: { x: 3, y: 3.5 },
      rotation: 3.14
    }
  ];
  
  const encodedBuffer = playerCodec.encodePlayers(players);
  const decodedPlayers = playerCodec.decodePlayers(encodedBuffer);

  t.equal(decodedPlayers.length, players.length, 'Correct number of players decoded');
  decodedPlayers.forEach((decodedPlayer, index) => {
    t.same(decodedPlayer, players[index], `Player ${index + 1} matches original`);
  });
  t.end();
});

// Test for missing properties
tap.test('Handle Missing Properties', async (t) => {
  const playerCodec = new PlayerCodec();
  const playerData = {
    id: 123,
    type: 'PLAYER',
    // Missing rotation, position, and velocity
  };

  const finalBuffer = playerCodec.encodePlayer(playerData);
  const decodedPlayer = playerCodec.decodePlayer(finalBuffer);

  t.equal(decodedPlayer.id, playerData.id, 'ID matches');
  t.equal(decodedPlayer.type, playerData.type, 'Type matches');
  t.notOk(decodedPlayer.rotation, 'Rotation should be null or undefined');
  t.notOk(decodedPlayer.position, 'Position should be null or undefined');
  t.notOk(decodedPlayer.velocity, 'Velocity should be null or undefined');
  t.end();
});