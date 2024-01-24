export default function randomTileFromDistribution(tileTypes, totalWeight) {
  let randomWeight = Math.random() * totalWeight;
  let weightSum = 0;

  for (let tileType of tileTypes) {
    weightSum += tileType.weight;
    if (randomWeight <= weightSum) {
      return tileType.id;
    }
  }

  return tileTypes[tileTypes.length - 1].id; // Fallback in case of rounding errors
}