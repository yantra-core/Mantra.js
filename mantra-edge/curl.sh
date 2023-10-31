 curl -X POST http://127.0.0.1:8787/createEntity \
-H "Content-Type: application/json" \
-d '{"entityId": "entity1", "type": "player", "x": 0, "y": 0}'



 curl -X POST http://127.0.0.1:8787/moveEntity \
-H "Content-Type: application/json" \
-d '{"entityId": "entity1",  "dx": 3, "dy": 3}'

