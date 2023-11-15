// Schema.js - Marak Squires 2023
import protobuf from 'protobufjs';
import messageSchema from './Message.js';
export default class Schema {
  constructor() {
   
  }

  init(game) {
    this.game = game;
    game.schemaReady = true;
    console.log('messageSchema', messageSchema)
    let root = protobuf.Root.fromJSON(messageSchema);
    console.log(root);
    game.Message = root.lookupType("Message");
    console.log(game.Message);
    /*
      // TODO: replace with general 'ready' event
      game.schemaReady = true;

      var Message = root.lookupType("Message");
      game.Message = Message;
    */
    
  }

}