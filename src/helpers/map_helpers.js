export function getMapBounds(mapPoints){
  let boundsArray = [];
  mapPoints.forEach(point =>
    boundsArray.push([point.latitude, point.longitude]));
  return boundsArray;
}