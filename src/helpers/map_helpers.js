export function getMapBounds(mapPoints){
  let boundsArray = [];
  mapPoints.forEach(point =>
    boundsArray.push([point.latitude, point.longitude]));
  return boundsArray;
}

// Find the distance between the specified point and all pois in selection then return an array of poi.ids for all pois within the provided distance. Default is 2000m if not provided.
export function findDistance (point, pois, distanceFilter=2000) {
  let L = window.L;
  let poiArray = []

  for (let poi of pois) {
    let distance = L.latLng([point.latitude, point.longitude]).distanceTo([poi.latitude, poi.longitude])
    if (distance <= distanceFilter) {
      poiArray.push(poi.id)
    }
  }
  console.log(poiArray)
  return poiArray
}