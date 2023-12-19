export default function setCursorStyle(graphic, scene, cursorStyle) {
  graphic.on('pointerover', () => {
      scene.game.canvas.style.cursor = cursorStyle;
  });

  graphic.on('pointerout', () => {
      scene.game.canvas.style.cursor = 'default';
  });
}