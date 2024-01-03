const routing = {};


routing.createLineRoute = function createLineRoute(startX, startY, endX, endY, step) {
  const route = [];
  const dx = endX - startX;
  const dy = endY - startY;
  const steps = Math.max(Math.abs(dx), Math.abs(dy)) / step;
  for (let i = 0; i <= steps; i++) {
    route.push([startX + dx * i / steps, startY + dy * i / steps]);
  }
  return route;
}

routing.createRectangleRoute = function createRectangleRoute(x, y, width, height) {
  return [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
    [x, y]
  ];
}

routing.createCircleRoute = function createCircleRoute(centerX, centerY, radius, segments) {
  const route = [];
  for (let i = 0; i <= segments; i++) {
    const angle = 2 * Math.PI * i / segments;
    route.push([centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)]);
  }
  return route;
}

/*
const lineRoute = createLineRoute(0, 0, 200, 200, 20);
const rectangleRoute = createRectangleRoute(50, 50, 150, 100);
const circleRoute = createCircleRoute(100, 100, 50, 20);
*/

export default routing;