import api from "./lib/index.js";

const entityTypes = {
  'PLAYER': 0,
  'BULLET': 1,
  'BLOCK': 2,
  'BORDER': 3,
  'BODY': 4
  // ... other types
};

const playerSchema = {
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

const snapshotSchema = {
  id: { type: 'UInt16' },
  state: {
    type: 'Collection',
    schema: playerSchema
  }
}

let players = [
  {

    id: 1,
    name: 'Bunny',
    type: 'PLAYER',
    position: { x: 10, y: 20 },
    velocity: { x: 1, y: 1 },
    width: 100,
    height: 100,
    rotation: 0,
    mass: 100,
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
    rotation: 157
  },
  {
    id: 3,
    name: 'Turtle',
    type: 'PLAYER',
    rotation: 314
  }
];

let snapshot = {
  id: 123,
  state: players
};

let encoded = api.encode(snapshotSchema, snapshot);
console.log('encoded', encoded)

let decoded = api.decode(snapshotSchema, encoded);
console.log('decoded', decoded)