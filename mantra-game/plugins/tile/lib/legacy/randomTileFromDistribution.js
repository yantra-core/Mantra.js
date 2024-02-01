export default function randomTileFromDistribution(tileKinds, totalWeight) {
  let randomWeight = Math.random() * totalWeight;
  let weightSum = 0;

  for (let tileType of tileKinds) {
    weightSum += tileType.weight;
    if (randomWeight <= weightSum) {
      return tileType.id;
    }
  }

  return tileKinds[tileKinds.length - 1].id; // Fallback in case of rounding errors
}