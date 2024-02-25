let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Canvas', 'Image', 'Player', 'Gamepad', 'Text']
});
game.start(function(){

  function processImage(image) {
    // TODO: create canvas first and update canvas instead of waiting for image to load
    let ent = game.make().Canvas({
      meta: {
        imageData: image
      }
    }).width(image.width).height(image.height).createEntity();

    setTimeout(function () {
      let updatedEnt = game.getEntity(ent.id);
      let graphic = updatedEnt.graphics['graphics-css'];
      let canvas = graphic.querySelector('canvas');
      console.log('updatedEnt', updatedEnt)
      sliceCanvasToEnts(canvas, 16, 16);
    }, 60)

  }

  // Create a new image element
  // You could also use game.make().Image() to create an image entity
  let image = new Image();
  image.style.display = 'none';
  image.onload = function () {
    processImage(image);
  };

  // If the image is already loaded (e.g., cached by the browser), draw it immediately
  if (image.complete) {
    processImage(image);

  }
  image.src = 'http://yantra.gg/mantra/img/game/env/warp-to-mantra-home-256.png';

  game.make().Text().x(100).y(-200).width(400).text('Create and embed canvas context').style({
    color: 'white',
    fontSize: '24px',
  }).createEntity();


  game.make().Text().x(100).y(200).width(400).text('Here we have sliced image to tiles').style({
    color: 'white',
    fontSize: '24px',
  }).createEntity();

  //game.make().Canvas().createEntity();
  game.make().Player().createEntity();

  game.setBackground('black');


});

function sliceCanvasToEnts(canvas, tileWidth, tileHeight) {
  const context = canvas.getContext('2d');
  const numRows = Math.ceil(canvas.height / tileHeight);
  const numCols = Math.ceil(canvas.width / tileWidth);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // Create a new canvas for each tile
      const tileCanvas = document.createElement('canvas');
      tileCanvas.width = tileWidth;
      tileCanvas.height = tileHeight;
      const tileContext = tileCanvas.getContext('2d');

      // Draw the image slice (from the main canvas) onto the tile canvas
      tileContext.drawImage(
        canvas,
        col * tileWidth, row * tileHeight, // Source x and y from the main canvas
        tileWidth, tileHeight, // Source width and height
        0, 0, // Destination x and y on the tile canvas
        tileWidth, tileHeight // Destination width and height on the tile canvas
      );

      let imgEnt = game.make().Image();
      // imgEnt.Hexapod();
      imgEnt.text(null);
      imgEnt.x(col * tileWidth + 300);
      imgEnt.y(row * tileHeight - 100);
      //imgEnt.height(tileHeight);
      //imgEnt.width(tileWidth);
      imgEnt.body(true);
      imgEnt.meta({
        imageData: tileCanvas
      })
      imgEnt.createEntity();

    }
  }
}