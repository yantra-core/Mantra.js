import PlayerCodec from './bbb4.js';

const actionTypes = {
  'gametick': 0,
  'assign_id': 1,
  'become_ticker': 2,
  'pong': 3
  // ... other action types
};

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
  }
};

const snapshotSchema = {
  id: { type: 'UInt16' },
  state: {
    type: 'Collection',
    schema: _schema
  }
}


let players = [
  {

    id: 1,
    name: 'Bunny',
    type: 'PLAYER',
    position: { x: 10, y: 20 },
  },
  {
    id: 2,
    name: 'Turtle',
    type: 'BLOCK',
    position: { x: 50, y: 60 }
  },
  {
    id: 3,
    name: 'Turtle',
    type: 'PLAYER',
    position: { x: 50, y: 60 },
    //velocity: { x: 3, y: 35 },
  }
];

let codec = new PlayerCodec(snapshotSchema, actionTypes);

//console.log('before', players)
let msg = {
  id: 123,
  state: players
}

let compressed = codec.encodeMessage(msg);

console.log(compressed);

let decompressed = codec.decodeMessage(compressed);

console.log(decompressed.state);


