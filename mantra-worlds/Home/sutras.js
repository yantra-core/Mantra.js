// helper sutra for switching worlds
import warpToWorld from '../sutras/warpToWorld.js';

// walker is npc that walks around route
import walker from '../../mantra-game/plugins/world-tower/sutras/walker.js';

// routing helper to create vector routes
import routing from '../sutras/routing.js';

import fire from "./sutras/fire.js";
import block from "./sutras/block.js";

export default function sutras(game) {

  let rules = game.createSutra();

  // when touching WARP entity, warp to world
  let warp = warpToWorld(game);
  rules.use(warp, 'warpToWorld');

  // walker is npc that walks around route
  rules.use(walker(game, {
    route: routing.createRectangleRoute(-50, -150, 200, -150),
    // route: routing.createLineRoute(-50, -150, 200, -150, 20),
    // route: routing.createCircleRoute(0, 0, 100, 20),
    tolerance: 5
  }), 'walker');

  // helper for playing notes
  rules.on('playNote', (collision) => game.playNote(collision.note));

  // fire entity
  rules.use(fire(game), 'fire');

  // block entity
  rules.use(block(game), 'block');

  console.log('created sutra', rules.toEnglish())
  return rules;
}