
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Hexapod', 'Gamepad', 'GamepadGUI', 'Bullet', 'Boomerang', 'SwitchGraphics'],
});
game.start(function () {
  game.setBackground('black');
  game
    .build()
    .color('red')
    .size(8)
    .body(false)
    .position(0, -150, 0)
    .offset(12, 12, 12)
    .repeaters({
      size: (index, total, current) => ({ 
        width: current.width + 2 * index,
        height: current.height + 2 * index,
        depth: current.depth + 2 * index
      }),
      // TODO: generate colors as repeater with index
      color: (index, total, current) => colorFromIndex(index, total),
      // position: (index, total, current) => ({ x: current.x + index * 24, y: current.y + index * 24}),
      // velocity: (index, total, current) => ({ x: current.x + index * 2, y: current.y })
    })
    .repeat(24)
    .createEntity()

    game
    .build()
    .color('red')
    .size(8)
    .body(false)
    .position(0, -150, 0)
    .offset(12, -12, 12)
    .repeaters({
      size: (index, total, current) => ({ 
        width: current.width + 2 * index,
        height: current.height + 2 * index,
        depth: current.depth + 2 * index
    }),
      // TODO: generate colors as repeater with index
      color: (index, total, current) => colorFromIndex(index, total),
      // position: (index, total, current) => ({ x: current.x + index * 24, y: current.y + index * 24}),
      // velocity: (index, total, current) => ({ x: current.x + index * 2, y: current.y })
    })
    .repeat(24)
    .createEntity()


    game
    .build()
    .color('red')
    .size(8)
    .body(false)
    .position(0, -150, 0)
    .offset(-12, -12, 12)
    .repeaters({
      size: (index, total, current) => ({ 
        width: current.width + 2 * index,
        height: current.height + 2 * index,
        depth: current.depth + 2 * index
    }),
      // TODO: generate colors as repeater with index
      color: (index, total, current) => colorFromIndex(index, total),
      // position: (index, total, current) => ({ x: current.x + index * 24, y: current.y + index * 24}),
      // velocity: (index, total, current) => ({ x: current.x + index * 2, y: current.y })
    })
    .repeat(24)
    .createEntity()

    game
    .build()
    .color('red')
    .size(8)
    .body(false)
    .position(0, -150, 0)
    .offset(-12, 12, 12)
    .repeaters({
      size: (index, total, current) => ({ 
        width: current.width + 2 * index,
        height: current.height + 2 * index,
        depth: current.depth + 2 * index
    }),
      // TODO: generate colors as repeater with index
      color: (index, total, current) => colorFromIndex(index, total),
      // position: (index, total, current) => ({ x: current.x + index * 24, y: current.y + index * 24}),
      // velocity: (index, total, current) => ({ x: current.x + index * 2, y: current.y })
    })
    .repeat(24)
    .createEntity()

    /*
    game
    .build()
    .color('red')
    .size(16)
    .body(false)
    .position(0, 0)
    .offset(-24, 24)
    .repeaters({
      size: (index, total, current) => ({ width: current.width * index, height: current.height * index }),
      // TODO: generate colors as repeater with index
      color: (index, total, current) => colorFromIndex(index, total),
      // position: (index, total, current) => ({ x: current.x + index * 24, y: current.y + index * 24}),
      // velocity: (index, total, current) => ({ x: current.x + index * 2, y: current.y })
    })
    .repeat(24)
    .createEntity()

    game
    .build()
    .color('red')
    .size(16)
    .body(false)
    .position(0, 0)
    .offset(-24, -24)
    .repeaters({
      size: (index, total, current) => ({ width: current.width * index, height: current.height * index }),
      // TODO: generate colors as repeater with index
      color: (index, total, current) => colorFromIndex(index, total),
      // position: (index, total, current) => ({ x: current.x + index * 24, y: current.y + index * 24}),
      // velocity: (index, total, current) => ({ x: current.x + index * 2, y: current.y })
    })
    .repeat(24)
    .createEntity()

    game
    .build()
    .color('red')
    .size(16)
    .body(false)
    .position(0, 0)
    .offset(24, -24)
    .repeaters({
      size: (index, total, current) => ({ width: current.width * index, height: current.height * index }),
      // TODO: generate colors as repeater with index
      color: (index, total, current) => colorFromIndex(index, total),
      // position: (index, total, current) => ({ x: current.x + index * 24, y: current.y + index * 24}),
      // velocity: (index, total, current) => ({ x: current.x + index * 2, y: current.y })
    })
    .repeat(24)
    .createEntity()
    
    */
    


});    

function colorFromIndex(index, total) {
  const segment = total / 3;
  let r = 0, g = 0, b = 0;

  if (index < segment) { // Red to Green
    r = 255 * (1 - (index / segment));
    g = 255 * (index / segment);
  } else if (index < 2 * segment) { // Green to Blue
    const adjustedIndex = index - segment;
    g = 255 * (1 - (adjustedIndex / segment));
    b = 255 * (adjustedIndex / segment);
  } else { // Blue to Red
    const adjustedIndex = index - 2 * segment;
    b = 255 * (1 - (adjustedIndex / segment));
    r = 255 * (adjustedIndex / segment);
  }

  // Ensuring the RGB values are integers
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  // Converting RGB to hexadecimal color string
  const color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  console.log('returning', color)
  return color;
}