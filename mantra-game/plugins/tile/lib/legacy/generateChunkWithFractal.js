// see: Labyrinthos.js
export default function generateChunkWithFractal(chunkKey, tileKinds, fractalType = 'mandelbrot') {
  let chunkData = [];
  const chunkSize = this.chunkUnitSize;
  const maxIter = 100; // Max iterations for fractal calculation
  const fractalBounds = { xMin: -2, xMax: 1, yMin: -1.5, yMax: 1.5 }; // Bounds for the fractal

  for (let i = 0; i < chunkSize * chunkSize; i++) {
    const x = i % chunkSize;
    const y = Math.floor(i / chunkSize);

    // Map chunk coordinates to fractal coordinates
    const fractalX = fractalBounds.xMin + (x / chunkSize) * (fractalBounds.xMax - fractalBounds.xMin);
    const fractalY = fractalBounds.yMin + (y / chunkSize) * (fractalBounds.yMax - fractalBounds.yMin);

    let tile;
    const iterations = mandelbrotIterations(fractalX, fractalY, maxIter);

    if (iterations === maxIter) {
      // Inside the set, pick a specific tile kind
      tile = { kind: 'path-brown' };
    } else {
      // Outside the set, choose randomly
      tile = this.randomTileFromDistribution(tileKinds, tileKinds.reduce((acc, kind) => acc + kind.weight, 0));
    }

    chunkData.push(tile);
  }

  let randomIntColor = Math.floor(Math.random() * 16777215);
  return {
    data: chunkData,
    height: chunkSize,
    width: chunkSize,
    color: randomIntColor,
    x: this.extractChunkCoordinates(chunkKey).x,
    y: this.extractChunkCoordinates(chunkKey).y
  };
}

function mandelbrotIterations(x, y, maxIter = 100) {
  let real = x;
  let imag = y;
  let n = 0;

  while (real * real + imag * imag <= 4 && n < maxIter) {
    let tempReal = real * real - imag * imag + x;
    imag = 2 * real * imag + y;
    real = tempReal;
    n++;
  }

  return n;
}
