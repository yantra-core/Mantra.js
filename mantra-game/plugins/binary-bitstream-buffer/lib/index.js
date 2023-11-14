// The Supreme JSON Compressor™ - Marak Squires 2023
import DecodingVisitor from "./DecodingVisitor.js";
import EncodingVisitor from "./EncodingVisitor.js";

let api = {};

api.encode = function encode (schema, object) {
  const encodingVisitor = new EncodingVisitor();
  const bitmask = encodingVisitor.createBitmask(object, schema);
  const bitBuffer = encodingVisitor.getBitBuffer();
  return bitBuffer;
};

api.decode = function decode (schema, bitBuffer) {
  let decodingVisitor = new DecodingVisitor(bitBuffer);
  let decoded = decodingVisitor.decode(schema);
  return decoded;  
}

export default api;