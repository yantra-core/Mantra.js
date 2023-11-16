// Schema.js - Marak Squires 2023
import protobuf from 'protobufjs';
import messageSchema from './Message.js';
export default class Schema {
  static id = 'schema';
  constructor() {
    this.id = Schema.id;
  }

  init(game) {
    this.game = game;
    game.schemaReady = true;
    let root = protobuf.Root.fromJSON(messageSchema);
    game.Message = root.lookupType("Message");
  }

}