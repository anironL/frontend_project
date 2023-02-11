import { useState, createContext } from 'react'

export const SearchbarContext = createContext();

const SearchbarProvider = function(props){
  const [distFilter, setDistFilter] = useState({
    distance: 50000,
    key1: false,
    key2: false,
    key3: false
  })
  // Set state.distance to equal input (used in an input field)
  const updateDistFilter = function (input) {
    setDistFilter({
      ...distFilter, 
      distance: input});
  }
  
  // Toggle search key between true/false
  const updateKeys = function (input) {
    if (distFilter[input] === false) {
      setDistFilter({
        ...distFilter,
        [input]: true
      })
    } else {
      setDistFilter({
        ...distFilter,
        [input]: false
      })
    }
  }

  // State to manage if current position is geolocation or set by user
  const [geolocation, setGeolocation] = useState(false)
  const [livelocation, setLivelocation] = useState( {
    loaded: true,
    coordinates: {
      latitude: 43.6426,
      longitude: -79.3872
    }
  })

  const toggleGeolocation = function () {
    if (geolocation === false) {
      setGeolocation(true)
    } else {
      setGeolocation(false)
    }
  }
  
  const updateLivelocation = function (input) {
    // console.log(input)
    setLivelocation(input);
  }

  // State to manage location position set by user
  const [startLocation, setStartLocation] = useState({
    latitude: 43.6426,
    longitude: -79.3872
  })
  
  const updateStartLocation = function (input) {
    console.log(input)
    setStartLocation(input);
  }

  // State to manage end position set by user
  const [endDestination, setEndDestination] = useState(null);

  const updateEndLocation = function (input) {
    setEndDestination(input);
  }

  // State to manage coordinates in route
  const [routeCoords, setRouteCoords] = useState([]);
  
  const updateRouteCoords = function (coords) {
    setRouteCoords(coords);
    console.log("New coordinates", coords)
  }
  
  const value = { distFilter, updateKeys, updateDistFilter, geolocation, toggleGeolocation, livelocation, updateLivelocation, startLocation, updateStartLocation, endDestination, setEndDestination, updateEndLocation, routeCoords, updateRouteCoords };

  return (
    <SearchbarContext.Provider value = {value}>
      {props.children}
    </SearchbarContext.Provider>
  )
};

export default SearchbarProvider;