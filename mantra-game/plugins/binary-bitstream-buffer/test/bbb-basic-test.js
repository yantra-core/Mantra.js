import tap from 'tape';
// import PlayerCodec from '../bbb4.js';

import api from '../lib/index.js';

// TODO: we'd expect these values to be in the schema as well
// Enum mapping for player types
const entityTypes = {
  'PLAYER': 0,
  'BULLET': 1,
  'BLOCK': 2,
  'BORDER': 3,
  'BODY': 4
  // ... other types
};


const _schema = {
  id: { type: 'UInt16' },
  name: { type: 'UTF8String' },
  type: { type: 'Enum', enum: entityTypes },
  position: {
    type: 'Record',
    schema: {
      x: { type: 'Int32' },
      y: { type: 'Int32' }
    }
  },
  velocity: {
    type: 'Record',
    schema: {
      x: { type: 'Int32' },
      y: { type: 'Int32' }
    }
  },
  width: { type: 'Int32' },
  height: { type: 'Int32' },
  rotation: { type: 'Int32' }, // TODO: special case with radians->bytes optimization
  mass: { type: 'Int32' },
  health: { type: 'Int32' },
  depth: { type: 'Float64' },
  lifetime: { type: 'Int32' },
  radius: { type: 'Float64' },
  isSensor: { type: 'Boolean' },
  isStatic: { type: 'Boolean' },
  destroyed: { type: 'Boolean' },
  owner: { type: 'UInt16' },
  maxSpeed: { type: 'Int32' }

};


let players = [
  {
   
  id: 1,
  name: 'Bunny',
  type: 'PLAYER',
  position: { x: 10, y: 20 },
  velocity: { x: 1, y: 1 },
  rotation: 0,
  mass: 100,
  width: 100,
  height: 100,
  health: 100,
  depth: 10,
  lifetime: 1000,
  radius: 100,
  isSensor: true,
  isStatic: true,
  destroyed: true,
  owner: 0,
  maxSpeed: 100,
  },
  {
    id: 2,
    name: 'Turtle',
    type: 'BLOCK',
    position: { x: 30, y: 40 },
    velocity: { x: 2, y: 2 },
    rotation: 157
  },
  {
    id: 3,
    name: 'Turtle',

    type: 'PLAYER',
    position: { x: 50, y: 60 },
    velocity: { x: 3, y: 35 },
    rotation: 314
  }
];

// Test encoding and decoding a single player
tap.test('Encode and Decode Single Player', async (t) => {
  //const playerCodec = new PlayerCodec(_schema);
  const playerData = players[0];
  const finalBuffer = api.encode(_schema, playerData);
  const decodedPlayer = api.decode(_schema, finalBuffer);
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


// Test for missing properties
tap.test('Handle Missing Properties', async (t) => {
  
  const playerData = {
    id: 123,
    destroyed: true
  };

  const finalBuffer = api.encode(_schema, playerData);
  const decodedPlayer = api.decode(_schema, finalBuffer);
  console.log(decodedPlayer)
  t.equal(decodedPlayer.id, playerData.id, 'ID matches');
  t.equal(decodedPlayer.type, playerData.type, 'Type matches');
  t.notOk(decodedPlayer.rotation, 'Rotation should be null or undefined');
  t.notOk(decodedPlayer.position, 'Position should be null or undefined');
  t.notOk(decodedPlayer.velocity, 'Velocity should be null or undefined');
  t.end();
});

// Test for snapshot structure
/*
tap.only('Wrap player array in snapshot object', async (t) => {
  const playerCodec = new PlayerCodec(_schema);

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
*/

/*
tap.test('test full snapshot structure', async (t) => {
  const playerCodec = new PlayerCodec(_schema);
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
*/