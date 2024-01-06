// helper sutra for switching worlds
import warpToWorld from '../sutras/warpToWorld.js';
import switchGraphics from '../sutras/switchGraphics.js';

// walker is npc that walks around route
import walker from '../../mantra-game/plugins/world-tower/sutras/walker.js';

// routing helper to create vector routes
import routing from '../sutras/routing.js';

import fire from "./sutras/fire.js";
import block from "./sutras/block.js";
import demon from "./sutras/demon.js";
import hexapod from './sutras/hexapod.js';

export default function sutras(game) {

  let rules = game.createSutra();

//  rules.addCondition('isGameRunning', (game) => true);  
//  rules.if('isGameRunning').then('warpToWorld');

  // helper for switching graphics
  let switchGraphicsSutra = switchGraphics(game);
  rules.use(switchGraphicsSutra, 'switchGraphics');


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

  // demon entity
  rules.use(demon(game), 'demon');

  // hexapod entity
  rules.use(hexapod(game), 'hexapod');

  // console.log('created sutra', rules.toEnglish())
  return rules;
}