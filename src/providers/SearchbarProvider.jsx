import { useState, createContext } from 'react'

export const SearchbarContext = createContext();

const SearchbarProvider = function(props){
  const [distFilter, setDistFilter] = useState({
    distance: 50000,
    key1: false,
    key2: false,
    key3: false
  })

  // originally an onChange function in a field
  // e => setDistFilter(e.target.value)
  const updateDistFilter = function (input) {
    setDistFilter({
      ...distFilter, 
      distance: input});
  }

  const updateKeys = function (input) {
    if (distFilter[input] === false) {
      setDistFilter({
        ...distFilter,
        input: true
      })
    } else {
      setDistFilter({
        ...distFilter,
        input: false
      })
    }
    console.log(distFilter)
    console.log(input, " switched to ", distFilter.input)
  }

  const value = { distFilter, updateKeys, updateDistFilter };

  return (
    <SearchbarContext.Provider value = {value}>
      {props.children}
    </SearchbarContext.Provider>
  )
};

export default SearchbarProvider;