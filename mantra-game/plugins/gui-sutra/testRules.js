//import sutra from '../../../../sutra/index.js';
import sutra from '@yantra-core/sutra';

// import sutra from '../../../../sutra/index.js';

export default function testRules() {

  let rules = new sutra.Sutra();

  // Define health level conditions for the boss
  const healthLevels = [800, 600, 400, 200, 0];
  const colors = [0x00ff00, 0x99ff00, 0xffff00, 0xff9900, 0xff0000]; // Green to Red

  // Custom function for 'isBoss' condition
  rules.addCondition('isBoss', (entity) => entity.type === 'BOSS');

  // Adding health level conditions
  healthLevels.forEach((level, index) => {
    rules.addCondition(`isHealthBelow${level}`, {
      op: 'lessThan',
      property: 'health',
      value: level
    });
  });

  /*
  // Action for the boss based on health levels
  rules.addAction({
    if: 'isBoss',
    then: healthLevels.map((level, index) => ({
      if: `isHealthBelow${level}`,
      then: [{ action: 'entity::updateEntity', data: { color: colors[index], speed: 5 } }]
    }))
  });
  */

  // use custom function for condition
  rules.addCondition('isBoss', (entity) => entity.type === 'BOSS');
  rules.addCondition('isSpawner', (entity) => entity.type === 'SPAWNER');

  // use standard Sutra DSL for condition
  rules.addCondition('isHealthLow', {
    op: 'lessThan',
    property: 'health',
    value: 50
  });

  rules.addCondition('blockCountLessThan5', {
    op: 'lessThan',
    gamePropertyPath: 'ents.BLOCK.length',
    value: 5
  });

  /*
  rules.addCondition('isDead', {
    op: 'lte',
    property: 'health',
    value: 0
  });
  */

  rules.on('entity::updateEntity', (entity, node) => {
    // create a new object that merges the entity and data
    //let updatedEntity = Object.assign({}, { id: entity.id }, data.data);
    // console.log("entity::updateEntity", entity, node);
    game.systems.entity.inflateEntity(entity);
    //game.emit('entity::updateEntity', entity);
  });

  rules.on('entity::createEntity', (entity, node) => {
    console.log("entity::createEntity", entity, node);
    game.systems.entity.createEntity(node.data);
    //game.emit('entity::createEntity', entity);
  });

  rules.addCondition('timerCompleted', entity => {
    // check if entities has timers and timer with name 'test-timer' is completed
    let timerDone = false;
    // TODO: remove this, should iterate and know timer names
    if (entity.timers && entity.timers.timers && entity.timers.timers['test-timer'] && entity.timers.timers['test-timer'].done) {
      timerDone = true;
      // set time done to false on origin timer
      entity.timers.timers['test-timer'].done = false;
    }

    return timerDone;
    //return entity.timerDone;
  });

  rules.addAction({
    if: 'isBoss',
    then: [{
      if: 'isHealthLow',
      then: [{
        action: 'entity::updateEntity',
        data: { color: 0xff0000, speed: 5 } // Example with multiple properties
      }]
    }]
  });

  function generateRandomColorInt() {
    return Math.floor(Math.random() * 255);
  }

  // Modify the action for the spawner to include the new condition
  rules.addAction({
    if: 'isSpawner',
    then: [{
      if: 'timerCompleted',
      then: [{
        if: ['blockCountLessThan5', 'spawnerHealthAbove50'],
        then: [{
          action: 'entity::createEntity',
          data: { type: 'BLOCK', height: 20, width: 20, position: { x: 0, y: 0 } }
        }
        ]
      }, {
        action: 'entity::updateEntity',
        data: { color: generateRandomColorInt, speed: 5 }
      }
      ]
    }]
  });

  // Composite AND condition
  rules.addCondition('isBossAndHealthLow', {
    op: 'and',
    conditions: ['isBoss', 'isHealthLow']
  });

  // New condition for spawner health
  rules.addCondition('spawnerHealthAbove50', {
    op: 'greaterThan',
    property: 'health',
    value: 50
  });


  rules.addAction({
    if: 'isBossAndHealthLow',
    then: [{ action: 'testAction' }]
  });

  return rules;

}