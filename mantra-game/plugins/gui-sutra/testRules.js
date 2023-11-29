import sutra from '../../../../sutra/index.js';

export default function testRules () {

  let rules = new sutra.Sutra();

  // use custom function for condition
  rules.addCondition('isBoss', (entity) => entity.type === 'BOSS');
  rules.addCondition('isSpawner', (entity) => entity.type === 'SPAWNER');

  /*
  // could also be written as:
  sutra.addCondition('isBoss', {
    operator: 'equals',
    property: 'type',
    value: 'BOSS'
  });
  */

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
    game.systems.entity.inflateEntity(entity);
    //game.emit('entity::updateEntity', entity);
  });

  rules.on('entity::createEntity', (entity, node) => {
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
        if: 'blockCountLessThan5',
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

  rules.addAction({
    if: 'isBossAndHealthLow',
    then: [{ action: 'testAction' }]
  });

  return rules;

}