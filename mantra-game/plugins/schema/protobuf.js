// import protobuf from 'protobufjs';
const protobuf = require('protobufjs');
const fs = require('fs');
const { performance } = require('perf_hooks');






protobuf.load("./messageSchema.proto", function (err, root) {
  if (err)
    throw err;

  // Obtain a message type
  var AwesomeMessage = root.lookupType("Message");

  runBenchmark(AwesomeMessage);


});

// Function to run benchmark
function runBenchmark(AwesomeMessage) {


  // Read test data from disk
  let testData = JSON.parse(fs.readFileSync('testData.json', 'utf8'));

  let totalEncodeTime = 0;
  let totalDecodeTime = 0;
  let totalSize = 0;

  // console.time('Total Benchmark Test');

  testData.forEach(snapshot => {

    // Exemplary payload
    var payload = snapshot;

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
      throw Error(errMsg);





    let startEncode = performance.now();



    // Create a new message
    var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

    //console.log(message);
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = AwesomeMessage.encode(message).finish();
    // ... do something with buffer


    totalEncodeTime += performance.now() - startEncode;
    totalSize += buffer.byteLength;

    let startDecode = performance.now();


    // Decode an Uint8Array (browser) or Buffer (node) to a message
    var message = AwesomeMessage.decode(buffer);
    // ... do something with message
    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

    // Maybe convert the message back to a plain object
    var object = AwesomeMessage.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
      // see ConversionOptions
    });


    totalDecodeTime += performance.now() - startDecode;
  });

  // console.timeEnd('Total Benchmark Test');

  console.log(`Average Encoding Time: ${(totalEncodeTime / testData.length).toFixed(2)}ms`);
  console.log(`Average Decoding Time: ${(totalDecodeTime / testData.length).toFixed(2)}ms`);
  console.log(`Average Size per Encoded Message: ${(totalSize / testData.length).toFixed(2)} bytes`);
}
