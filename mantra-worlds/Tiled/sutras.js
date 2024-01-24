// helper sutra for switching worlds
import warpToWorld from '../sutras/warpToWorld.js';
import switchGraphics from '../sutras/switchGraphics.js';

// walker is npc that walks around route
import walker from '../TowerDefense/sutras/walker.js';

// routing helper to create vector routes
import routing from '../sutras/routing.js';

import fire from "../../mantra-sutras/fire.js";
// import block from "./sutras/block.js";
import demon from "../../mantra-sutras/demon.js";
import hexapod from '../../mantra-sutras/hexapod.js';
import movement from "../../mantra-sutras/player-movement/top-down.js";

import bomb from '../../mantra-sutras/bomb.js';


export default function sutras(game) {

  let rules = game.createSutra();

  // movement
  rules.use(movement(game), 'movement');

  // helper for switching graphics
  let switchGraphicsSutra = switchGraphics(game);
  rules.use(switchGraphicsSutra, 'switchGraphics');

  // when touching WARP entity, warp to world
  let warp = warpToWorld(game);
  rules.use(warp, 'warpToWorld');


  // helper for playing notes
  rules.on('playNote', (collision) => game.playNote(collision.note));

  // fire entity
  // rules.use(fire(game), 'fire');

  // block entity
  // rules.use(block(game), 'block');

  // demon entity
  // rules.use(demon(game), 'demon');

  // hexapod entity
  // rules.use(hexapod(game), 'hexapod');

  // bomb item
  rules.use(bomb(game), 'bomb');


  // console.log('created sutra', rules.toEnglish())
  return rules;
}