// helper sutra for switching worlds
import switchGraphics from '../sutras/switchGraphics.js';

// walker is npc that walks around route
import walker from '../TowerDefense/sutras/walker.js';

// routing helper to create vector routes
import routing from '../sutras/routing.js';

// import fire from "../../mantra-sutras/fire.js";
import block from "./sutras/block.js";
import demon from "../../mantra-sutras/demon.js";
// import hexapod from '../../mantra-sutras/hexapod.js';
// import movement from "../../mantra-sutras/player-movement/top-down.js";

import bomb from '../../mantra-sutras/bomb.js';

export default function sutras(game) {

  let rules = game.createSutra();

  // movement
  // not work, inputs to sutra tick not making it to subtree?
  // double check sutra tick in mantra plugin and sutra core
  // this *should* work
  // rules.use(movement(game), 'movement');

  // for now, ensure that player input movement sutras are top level rules
  // we should be able to use the movement sutra as a sub-sutra, see above comment
  // game.useSutra(movement(game), 'mode-topdown');

  // helper for switching graphics
  let switchGraphicsSutra = switchGraphics(game);
  rules.use(switchGraphicsSutra, 'switchGraphics');

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
  // rules.use(fire(game), 'fire');

  // block entity
  rules.use(block(game), 'block');

  // demon entity
  rules.use(demon(game), 'demon');

  // hexapod entity
  // rules.use(hexapod(game), 'hexapod');

  // bomb item
  rules.use(bomb(game), 'bomb');

  // console.log('created sutra', rules.toEnglish())
  return rules;
}