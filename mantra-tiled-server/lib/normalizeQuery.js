export default function normalizeQuery(query, gridSize) {
  const minX = Math.floor(query.x / gridSize) * gridSize;
  const minY = Math.floor(query.y / gridSize) * gridSize;
  const maxX = Math.ceil((query.x + query.width) / gridSize) * gridSize;
  const maxY = Math.ceil((query.y + query.height) / gridSize) * gridSize;

  return { minX, minY, maxX, maxY };
}
