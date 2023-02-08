import { useState, useEffect } from 'react'

export default function useGeolocation() {
  const [location, setLocation] =  useState({
    loaded: false,
    coordinates: { latitude:"", longitude:""} 
  });
  const response = (newLocation) => {
    console.log("useGeolocation response", newLocation)
    setLocation({
        loaded: true,
        coordinates: {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
        },
    });
    }
  const error = (error) => {
    setLocation({
        loaded: true,
        error,
    })
  }

  useEffect(() => {
    if( !("geolocation" in navigator)){
        error({
          code: 0,
          message: "Geolocation not supported or denied."      
        })
    }  

    let id = navigator.geolocation.watchPosition(response, error)

    return () => { 
      navigator.geolocation.clearWatch(id)
    }
  }, [location.coordinates.latitude, location.coordinates.longitude])

// Geolocation snap to map area
// const snapToLocation = () => {
//   if (location.loaded && !location.error) {
//     mapRef.current.leafletElement.flyTo(
//       [ location.coordinates.latitude, location.coordinates.longitude ], 
//       15, //ZOOM_LEVEL
//       {animate: true})
//   } else {
//     alert(location.error.message)
//   }
// } 

  return location
}