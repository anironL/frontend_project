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

  const toggleGeolocation = function () {
    if (geolocation === false) {
      setGeolocation(true)
    } else {
      setGeolocation(false)
    }
    console.log("geolocation:", geolocation)
  }

  const value = { distFilter, updateKeys, updateDistFilter, geolocation, toggleGeolocation };

  return (
    <SearchbarContext.Provider value = {value}>
      {props.children}
    </SearchbarContext.Provider>
  )
};

export default SearchbarProvider;