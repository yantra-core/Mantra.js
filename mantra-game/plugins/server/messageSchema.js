const actionTypes = {
  'gametick': 0,
  'assign_id': 1,
  'become_ticker': 2,
  'pong': 3
  // ... other action types
};


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
  name: { type: 'UTF8String' }, // can we put a size limit on UTF8String encoding?
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

const messageSchema = {
  action: { type: 'Enum', enum: actionTypes },
  snapshot: {
    type: 'Record',
    schema: snapshotSchema
  },
  lastProcessedInput: { type: 'UInt16' },
};

export default messageSchema;