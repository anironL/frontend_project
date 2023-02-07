import { useState } from 'react'

const SearchbarProvider = function(){
  const [distFilter, setDistFilter] = useState("50000")

  // originally an onChange function in a field
  // e => setDistFilter(e.target.value)
  const updateDistFilter = function (input) {
    setDistFilter(input);
  }

  return (
    <></>
  )
};

export default SearchbarProvider