export default function setBodySize(body, size) {
  let Matter = this.Matter
  // size may have height and width ( rect ), or radius ( circle )
  /*
  if (typeof size.width !== 'undefined') {
    Matter.Body.scale(body, size.width / body.bounds.max.x, 1);
  }
  if (typeof size.height !== 'undefined') {
    Matter.Body.scale(body, 1, size.height / body.bounds.max.y);
  }
  */
  if (typeof size.radius !== 'undefined') {
    // Estimate the current radius as the average of width and height
    let currentRadius = (body.bounds.max.x - body.bounds.min.x + body.bounds.max.y - body.bounds.min.y) / 4;

    //console.log('Current Radius:', currentRadius);
    //console.log('New Radius:', size.radius);

    // Calculate the scale factor
    let scaleFactor = size.radius / currentRadius;
    //console.log('Scaling Factor:', scaleFactor);

    // Apply the scaling
    Matter.Body.scale(body, scaleFactor, scaleFactor);
  }
}