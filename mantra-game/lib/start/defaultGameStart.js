export default function defaultGameStart(game) {
  let plugins = game.plugins;
  game.use('Bullet');
  game.createBorder({
    height: 2000,
    width: 2000
  });
}