
protobuf.load(__dirname + "/Message.proto", function (err, root) {
  if (err) {
    throw err;
  }
  let jsonDescriptor = root.toJSON();

  // write descriptor to file
  fs.writeFileSync(__dirname + "/Message.json", JSON.stringify(jsonDescriptor, null, 2));
  //console.log(root.toJSON());

  // Schema.js - Marak Squires 2023
import protobuf from 'protobufjs';
// import messageSchema = require("./Message.json"); // exemplary for node
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default class Schema {
  constructor() {
   
  }