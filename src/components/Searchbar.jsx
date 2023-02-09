import React, { useContext } from 'react'
import { SearchbarContext } from '../providers/SearchbarProvider';

//MUI Imports
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function Searchbar() {
  const { distFilter, updateKeys, updateDistFilter, geolocation, toggleGeolocation } = useContext(SearchbarContext);

  // Material UI Consts
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  const [selected, setSelected] = React.useState(false);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  
  return (
    <section style={ {color: "white", backgroundColor: "Green", width: "100%"} }>
      
      <h1> Searchbar component</h1>
      
      Search (m):       
      <input 
        onChange={(e => {
          updateDistFilter(e.target.value)
        })}
        value={distFilter.distance} 
        placeholder='Search Distance' 
      />   
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
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

      \
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        onClick={() => toggleGeolocation()}>
          geolocation
      </ToggleButton>
      /
    </section>
  )
}