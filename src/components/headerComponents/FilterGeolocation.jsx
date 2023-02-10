import React, { useContext, useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton';

import { SearchbarContext } from '../../providers/SearchbarProvider';

export default function FilterGeolocation(props) {
  const [selected, setSelected] = useState(false);
  const { toggleGeolocation } = useContext(SearchbarContext);

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      onClick={() => toggleGeolocation()}>
        geolocation
    </ToggleButton>
  )
}