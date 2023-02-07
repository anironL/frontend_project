import { useState } from 'react'

const useFilterDistance = function(){
  const [distFilter, setDistFilter] = useState("50000")

  // originally an onChange function in a field
  // e => setDistFilter(e.target.value)
  const updateDistFilter = function (input) {
    setDistFilter(input);
  }

  return { distFilter, updateDistFilter }
};

export default useFilterDistance