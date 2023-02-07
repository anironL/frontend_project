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
    console.log(error)
  }

  useEffect(() => {
    if( !("geolocation" in navigator)){
        error({
          code: 0,
          message: "Geolocation not supported or denied."      
        })
    }  

    let id = navigator.geolocation.watchPosition(response, error)
    // navigator.geolocation.getCurrentPosition(response, error)
    return () => { 
      navigator.geolocation.clearWatch(id)
      // console.log("cleanup watchPosition")
    }
  }, [location.coordinates.latitude, location.coordinates.longitude])
  //[location])

  return location
}