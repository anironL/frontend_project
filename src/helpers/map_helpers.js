export function getMapBounds(mapPoints){
  let boundsArray = [];
  mapPoints.forEach(point =>
    boundsArray.push([point.latitude, point.longitude]));
  return boundsArray;
}

// Find the distance between the specified point and all pois in selection then return an array of poi.ids for all pois within the provided distance. Default is 2000m if not provided.
export function filterDistance (point, pois, distanceFilter=2000) {
  let L = window.L;
  let poiArray = []

  for (let poi of pois) {
    let distance = L.latLng([point.latitude, point.longitude]).distanceTo([poi.latitude, poi.longitude])
    if (distance <= distanceFilter) {
      poiArray.push(poi)
    }
  }
  console.log("Arrays within distance of point:", poiArray)
  return poiArray
}

// Filter an array for each key
export function  filterKey(keys, pois) {
    let poiArray = []
    let overlappingPOIs = []
  
    for (let key in keys) {
      if (keys[key] === true) {
        poiArray.push(filterKeyPOIs(key, pois))
      }
    }
  
    if (poiArray[0]) {
      overlappingPOIs = poiArray[0];
    
      for (let array of poiArray) {
        overlappingPOIs = overlappingPOIs.filter(e => array.includes(e));
        console.log("Overlap", overlappingPOIs)
      }
      
    return overlappingPOIs
    }
    
  return pois
}
  
// Filter pois and return if key exists in array. Used by filterKey and not exported. 
  function filterKeyPOIs (key, pois) {
    let poiArray = []
    
    for (let poi of pois) {
      if (poi.keys.includes(key)){
        poiArray.push(poi)
      }
    }
  
    return poiArray
  }