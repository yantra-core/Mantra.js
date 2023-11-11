import tap from 'tape';
import PlayerCodec from '../bbb.js';

let players = [
  {
    id: 1,
    name: 'Bunny',
    type: 'PLAYER',
    position: { x: 10, y: 20 },
    velocity: { x: 1, y: 1.5 },
    rotation: 0,
    mass: 100,
    width: 100,
    height: 100,
    depth: 10,
    lifetime: 1000,
    health: 100,
    radius: 100,
    isSensor: true,
    isStatic: true,
    destroyed: true,
    owner: 'test',
    maxSpeed: 100,
  
  },
  {
    id: 2,
    name: 'Turtle',
    type: 'BLOCK',
    position: { x: 30, y: 40 },
    velocity: { x: 2, y: 2.5 },
    rotation: 1.57
  },
  {
    id: 3,
    name: 'Turtle',

    type: 'PLAYER',
    position: { x: 50, y: 60 },
    velocity: { x: 3, y: 3.5 },
    rotation: 3.14
  }
];

// Test encoding and decoding a single player
tap.test('Encode and Decode Single Player', async (t) => {
  const playerCodec = new PlayerCodec();
  const playerData = players[0];

  const finalBuffer = playerCodec.encodePlayer(playerData);
  const decodedPlayer = playerCodec.decodePlayer(finalBuffer);
  t.equal(decodedPlayer.id, playerData.id, 'ID matches');
  //t.equal(decodedPlayer.name, playerData.name, 'Name matches')
  t.equal(decodedPlayer.type, playerData.type, 'Type matches');
  t.notOk(decodedPlayer.rotation, 'Rotation should be null or undefined');
  t.same(decodedPlayer.position, playerData.position, 'Position matches');
  t.same(decodedPlayer.velocity, playerData.velocity, 'Velocity matches');
  t.same(decodedPlayer.rotation, playerData.rotation, 'Rotation matches');
  t.same(decodedPlayer.health, playerData.health, 'Health matches');
  t.same(decodedPlayer.mass, playerData.mass, 'Mass matches');
  t.same(decodedPlayer.width, playerData.width, 'Width matches');
  t.same(decodedPlayer.height, playerData.height, 'Height matches');
  t.same(decodedPlayer.depth, playerData.depth, 'Depth matches');
  t.same(decodedPlayer.lifetime, playerData.lifetime, 'Lifetime matches');
  t.end();
});

// Test encoding and decoding multiple players
tap.test('Encode and Decode Multiple Players', async (t) => {
  const playerCodec = new PlayerCodec();


  const encodedBuffer = playerCodec.encodePlayers(players);
  const decodedPlayers = playerCodec.decodePlayers(encodedBuffer);

  t.equal(decodedPlayers.length, players.length, 'Correct number of players decoded');
  decodedPlayers.forEach((decodedPlayer, index) => {
    console.log(decodedPlayer, players[index])
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

// Test for snapshot structure
tap.test('Wrap player array in snapshot object', async (t) => {
  const playerCodec = new PlayerCodec();

  const msg = {
    action: 'gametick',
    snapshot: {
      id: 123,
      state: players
    },
    lastProcessedInput: 0

  }

  const finalBuffer = playerCodec.encodeMessage(msg);

  const decodedMessage = playerCodec.decodeMessage(finalBuffer);

  console.log(decodedMessage)
  t.equal(decodedMessage.action, msg.action, 'Action matches');
  t.equal(decodedMessage.lastProcessedInput, msg.lastProcessedInput, 'Last processed input matches');
  t.equal(decodedMessage.snapshot.id, msg.snapshot.id, 'Snapshot ID matches');
  t.equal(decodedMessage.snapshot.state.length, msg.snapshot.state.length, 'Correct number of players decoded');
  // test that the message is decoded correctly
  t.end();
});

tap.test('test full snapshot structure', async (t) => {
  const playerCodec = new PlayerCodec();
  const msg = {
    "action": "gametick",
    "snapshot": {
      "id": 1,
      "state": [
        {
          "id": 0,
          "type": "BLOCK",
          "position": {
            "x": 500,
            "y": -500
          },
          "velocity": {
            "x": 0,
            "y": 0,
            "z": 0
          },
          "mass": 100,
          "health": 100,
          "width": 500,
          "height": 500,
          "depth": 10,
          "lifetime": null
        },
        {
          "id": 1,
          "type": "BLOCK",
          "position": {
            "x": -500,
            "y": -500
          },
          "velocity": {
            "x": 0,
            "y": 0
          },
          "mass": 100,
          "health": 100,
          "rotation": null,
          "width": 500,
          "height": 500,
          "depth": 10,
          "lifetime": null
        },
        {
          "id": 2,
          "type": "PLAYER",
          "position": {
            "x": 0,
            "y": 0
          },
          "velocity": {
            "x": 0,
            "y": 0
          },
          "mass": 100,
          "health": 100,
          "rotation": null,
          "width": 100,
          "height": 100,
          "depth": 10,
          "lifetime": null
        }
      ]
    },
    "lastProcessedInput": 0
  }

  const finalBuffer = playerCodec.encodeMessage(msg);

  const decodedMessage = playerCodec.decodeMessage(finalBuffer);

  console.log(decodedMessage)
  t.equal(decodedMessage.action, msg.action, 'Action matches');
  t.equal(decodedMessage.lastProcessedInput, msg.lastProcessedInput, 'Last processed input matches');
  t.equal(decodedMessage.snapshot.id, msg.snapshot.id, 'Snapshot ID matches');
  t.equal(decodedMessage.snapshot.state.length, msg.snapshot.state.length, 'Correct number of players decoded');
  // test that the message is decoded correctly
  t.end();
});