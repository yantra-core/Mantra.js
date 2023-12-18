export default function bindLEDLightEvents (part, contraption) {
  let game = this.game;

  part.realStone.on('LEDLight::on', () => {
    // set the tint of the entity to yellow
    game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });
  part.realStone.on('LEDLight::off', () => {
    game.updateEntity({ id: part.entityId, color: part.color });
  });

  /* // TODO: investigate why this event name doesn't work anymore, it should
  part.on('off', () => {
    alert('LEDLight::off')
  });
  part.on('on', () => {
    alert('LEDLight::on')
  });
  */
}