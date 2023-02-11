import React, { useContext } from 'react'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { SearchbarContext } from '../../providers/SearchbarProvider';

export default function FilterKeys(props) {
  const { updateKeys } = useContext(SearchbarContext);

  return (
    <ToggleButtonGroup
      aria-label="key toggles"
    >
      <ToggleButton
        onClick={() => updateKeys("key1")}>
          key1
      </ToggleButton>

      <ToggleButton
        onClick={() => updateKeys("key2")}>
          key2
      </ToggleButton>

      <ToggleButton
        onClick={() => updateKeys("key3")}>
          key3
      </ToggleButton>
    </ToggleButtonGroup>
  )
}