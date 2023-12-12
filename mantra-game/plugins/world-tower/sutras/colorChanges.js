export default function colorChanges() {
  let game = this.game;
  let colorChanges = this.game.createSutra();

  colorChanges.addCondition('changesColorWithDamage', {
    op: 'or',
    conditions: ['isSpawner', 'isPlayer', 'isBorder']
  });

  // Define health level conditions for the boss
  const healthLevels = [100, 80, 60, 40, 20];
  const colors = [0x00ff00, 0x99ff00, 0xffff00, 0xff9900, 0xff0000]; // Green to Red

  // Adding health level conditions
  healthLevels.forEach((level, index) => {
    colorChanges.addCondition(`isHealthBelow${level}`, {
      op: 'lessThan',
      property: 'health',
      value: level
    });
  });

  // Action for the boss based on health levels
  colorChanges.addAction({
    if: 'changesColorWithDamage',
    then: healthLevels.map((level, index) => ({
      if: `isHealthBelow${level}`,
      then: [{ action: 'entity::updateEntity', data: { color: colors[index] } }]
    }))
  });

  colorChanges.on('entity::updateEntity', function (data, node) {
    // console.log('entity::updateEntity', data);
    game.updateEntity(data);
  });

  return colorChanges;

}
