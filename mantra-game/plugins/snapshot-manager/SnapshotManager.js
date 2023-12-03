import getPlayerSnapshot from './SnapShotManager/getPlayerSnapshot.js';

class SnapshotManager {
  static id = 'snapshot-manager';
  constructor() {
    this.snapshotCount = 0;
    this.snapshotBuffer = [];
    this.id = SnapshotManager.id;


  }

  init(game) {
    game.lastProcessedInput = {};
    this.game = game;
    // hoist snapshotManager to game instance
    this.game.snapshotManager = this;
    // Bind some methods to parent Game scope for convenience
    // The most useful and common System methods are expected to be bound to Game
    // This allows developers to customcraft a clean Game API based on their needs
    // this.getPlayerSnapshot = getPlayerSnapshot.bind(this);
    this.game.saveSnapshot = this.saveSnapshot.bind(this);
    this.game.getSnapshot = this.getSnapshot.bind(this);
    this.game.getPlayerSnapshot = getPlayerSnapshot;
  }

  saveSnapshot(entities, lastProcessedInput) {
    this.snapshotCount++;
    const snapshotId = this.snapshotCount;
    const snapshotState = Object.values(entities);
    const snapshot = {
      state: snapshotState,
      lastProcessedInput: { ...lastProcessedInput }
    };
    this.snapshotBuffer.push({ snapshotId, snapshot });
    while (this.snapshotBuffer.length > 10) {  // Keep the last 10 snapshots
      this.snapshotBuffer.shift();
    }
  }

  getSnapshot(snapshotId) {
    const found = this.snapshotBuffer.find(snapshotObj => snapshotObj.snapshotId === snapshotId);
    return found ? found.snapshot : null;
  }

  getPlayerSnapshot(entityId) {
    getPlayerSnapshot.bind(this.game)(entityId);
  }

}

export default SnapshotManager;


/*

class CompositeEncoder {
  constructor(encoders = []) {
    this.encoders = encoders;
  }

  addEncoder(encoder) {
    this.encoders.push(encoder);
  }

  encode(data) {
    return this.encoders.reduce((encodedData, encoder) => encoder.encode(encodedData), data);
  }
}

class CompositeDecoder {
  constructor(decoders = []) {
    this.decoders = decoders;
  }

  addDecoder(decoder) {
    this.decoders.push(decoder);
  }

  decode(data) {
    // Note: Decoding should typically be in reverse order of encoding
    return this.decoders.reduceRight((decodedData, decoder) => decoder.decode(decodedData), data);
  }
}


import MsgPackEncoder from '../shared/encoding/MsgPackEncoder.js'; // Hypothetical MsgPack encoders
import MsgPackDecoder from '../shared/encoding/MsgPackDecoder.js';

//...

constructor() {
  this.snapshotBuffer = [];

  // Create a composite encoder and decoder with all necessary steps
  this.encoder = new CompositeEncoder([
    new DeltaEncoder(),
    new DeltaCompressor(),
    new MsgPackEncoder() // Added as the final encoding step
  ]);

  this.decoder = new CompositeDecoder([
    new MsgPackDecoder(), // Added as the first decoding step
    new DeltaCompressor(), // Assuming this can also decode, or provide a DeltaDecompressor if needed
    new DeltaEncoder() // Assuming this can also decode, or provide a DeltaDecoder if needed
  ]);
}

saveSnapshot(entities, lastProcessedInput) {
  // ...
  const encodedState = this.encoder.encode(rawSnapshotState);
  // ...
}

getDecodedSnapshot(snapshotId) {
  const snapshot = this.getSnapshot(snapshotId);
  if (snapshot) {
    return this.decoder.decode(snapshot.state);
  }
  return null;
}

*/