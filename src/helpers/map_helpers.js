export function getMapBounds(mapPoints){
  let boundsArray = [];
  mapPoints.forEach(point =>
    boundsArray.push([point.latitude, point.longitude]));
  return boundsArray;
}

// Find the distance between the specified point and all pois in selection and return an array of poi.ids for all pois within the provided km distance. Default is 5km if not provided.
export function findDistance (point, pois, distanceFilter=5) {
  let poiArray = []
  const origin = DDtoKm(point.latitude, point.longitude)

  for (let poi of pois) {
    let distance = DDtoKm(poi.latitude, poi.longitude) - origin
    if (distance <= distanceFilter) {
      poiArray.push(poi.id)
    }
  }

  console.log(poiArray)
  return poiArray
}

// Convert provided km to lat/lng difference at:
    // Latitude: 1 deg = 110.574 km
    // Longitude: 1 deg = 111.320*cos(latitude) km
function DDtoKm (lat, lng) {
  let latDistance = lat * 110.574
  let longDistance = lng * (111.320 * Math.cos(lat))

  let kmDistance = Math.abs(latDistance) + Math.abs(longDistance)
  return kmDistance
}
