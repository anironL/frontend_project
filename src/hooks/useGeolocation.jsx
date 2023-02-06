import React, { useState, useEffect } from 'react'

export default function useGeolocation() {
  const [location, setLocation] =  useState({
    loaded: false,
    coordinates: { latitude:"", longitude:""} 
  });
  const onSuccess = (location) => {
    setLocation({
        loaded: true,
        coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        },
    });
    }
  const onError = (error) => {
    setLocation({
        loaded: true,
        error,
    })
    console.log(error)
  }

  useEffect(() => {
    if( !("geolocation" in navigator)){
        onError({
          code: 0,
          message: "Geolocation not supported or denied."      
        })
    //   setLocation(prev => ({
    //     ...prev,
    //     loaded: true,
    //     error: {
    //       code: 0,
    //       message: "Geolocation not supported or denied."
    //     }
    //   }))
    }  

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [location])

  return location
}