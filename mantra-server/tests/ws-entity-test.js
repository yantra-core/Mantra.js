// Simple integration test for the WebSocket server

const tap = require("tape");
const WebSocket = require("ws");

let ws;

tap.test("WebSocket Server", t => {
  ws = new WebSocket('ws://127.0.0.1:8888/websocket');

  ws.on("error", (error) => {
    t.fail(`WebSocket error: ${error.message}`);
    t.end(); // Ensure the test concludes in the event of an error
  });

  ws.on("open", () => {
    t.pass("WebSocket connection established");
    ws.send(JSON.stringify({
      action: "getSnapshot"
    }));
  });

  ws.once("message", (data) => {
    const message = JSON.parse(data);
    if (message.snapshot) {
      t.ok(message.snapshot, "Should return a game snapshot");
      t.end(); // End the test after receiving and checking the snapshot
    } else {
      t.fail(`Unexpected action received: ${message.action}`);
      t.end(); // Ensure the test concludes after processing the unexpected message
    }
  });
});

tap.test("Close WebSocket connection", t => {
  ws.close();
  t.pass("WebSocket connection closed");
  t.end();
});
