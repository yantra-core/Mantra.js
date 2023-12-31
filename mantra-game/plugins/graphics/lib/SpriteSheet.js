export default class SpriteSheetHandler {

  constructor(spritesheetWidth, spritesheetHeight, cellSize, spriteSize) {
    this.spritesheetWidth = spritesheetWidth;
    this.spritesheetHeight = spritesheetHeight;
    this.cellSize = cellSize;
    this.spriteSize = spriteSize; // Actual size of the sprite
  }

  getCell(x, y) {
    // Calculate the offset to center the sprite within the cell
    const paddingX = (this.cellSize - this.spriteSize.width) / 2;
    const paddingY = (this.cellSize - this.spriteSize.height) / 2;

    // Calculate sprite's position with padding
    const spriteX = x * this.cellSize + paddingX;
    const spriteY = y * this.cellSize + paddingY;

    return { x: spriteX, y: spriteY, width: this.spriteSize.width, height: this.spriteSize.height };
  }

  getBackgroundStyles(spriteData) {
    return {
      backgroundPosition: `${-spriteData.x}px ${-spriteData.y}px`,
      backgroundSize: `${this.spritesheetWidth}px ${this.spritesheetHeight}px`
    };
  }

  updateEntity(entity, textureSheetUrl, spriteData) {
    const styles = this.getBackgroundStyles(spriteData);
    // console.log('supdating', entity, spriteData, styles)
    // Remark: needs game reference here
    console.log('SpirteSheet class updateEntity', styles, entity, textureSheetUrl, spriteData)
    game.updateEntity({
      id: entity.id,
      texture: {
        sheet: textureSheetUrl,
        frame: spriteData.frameName
      },
      style: {
        background: `url(${textureSheetUrl})`,
        ...styles
      }
    });
  }

}