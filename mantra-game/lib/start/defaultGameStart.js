export default function defaultGameStart(game) {
  game.use('Bullet');
  game.createBorder({
    height: 2000,
    width: 2000
  });
}