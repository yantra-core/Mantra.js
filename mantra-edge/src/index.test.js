let wrangler = require("wrangler");
let unstable_dev = require("wrangler").unstable_dev;
let tap = require("tape");

let worker;

tap.test(async () => {
  worker = await unstable_dev("index.js", {
    experimental: { disableExperimentalWarning: true },
  });
});

tap.test("Durable Object", async t => {
  await t.test("Entity", async t => {
    await t.test("should create an entity with specified properties", async t => {
      let resp = await worker.fetch(`http://example.com/createEntity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityId: 'entity1', type: 'player', x: 0, y: 0 })
      });
      t.equal(resp.status, 200, "Should return 200 OK");
    });

    await t.test("should move entity with specified deltas", async t => {
      // Assume an entity is already created with entityId: 'entity1', x: 0, y: 0
      let resp = await worker.fetch(`http://example.com/moveEntity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityId: 'entity1', dx: 1, dy: 1 })
      });
      t.equal(resp.status, 200, "Should return 200 OK");

      // send gameTick action to move engine forward
      resp = await worker.fetch(`http://example.com/gameTick`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'gameTick' })
      });
      t.equal(resp.status, 200, "Should return 200 OK");


      resp = await worker.fetch(`http://example.com/getEntity?entityId=entity1`);
      t.equal(resp.status, 200, "Should return 200 OK");
      const entity = await resp.json();
      t.deepEqual(entity, { type: 'player', x: 1, y: 1 }, "Entity position should match specified deltas");
      t.end();
    });

    await t.test("should get all entities", async t => {
      let resp = await worker.fetch(`http://example.com/getEntities`);
      t.equal(resp.status, 200, "Should return 200 OK");

      const entities = await resp.json();
      t.ok(entities, "Should return entities object");
      t.end();
    });

    await t.test("should take a snapshot and retrieve it", async t => {
      // Assume the Game Durable Object has a method to take a snapshot
      let resp = await worker.fetch(`http://example.com/getSnapshot?index=0`);
      t.equal(resp.status, 200, "Should return 200 OK");
      const snapshot = await resp.json();
      console.log('ssss', snapshot)
      t.ok(snapshot, "Should return a snapshot object");
      t.end();
    });
    t.end();
  });
  t.end();
});

tap.test(async () => {
  await worker.stop();
});
