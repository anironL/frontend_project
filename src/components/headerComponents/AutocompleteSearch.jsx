import * as React from 'react';
import Autocomplete from "react-google-autocomplete";      
import { SearchbarContext } from '../../providers/SearchbarProvider';

const AutocompleteSearch = (props) => {
  const { updateStartLocation, updateEndLocation } = React.useContext(SearchbarContext)

  const apiKey = "AIzaSyBXxqq68-fUj86nSuBdusPPy3wD7a0dxxE&callback=Function.prototype";
  return ( 
    <Autocomplete
      apiKey={apiKey}
      onPlaceSelected={(place) => {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
       props.update === "start" ?
        updateStartLocation(
          {latitude: lat, 
            longitude: lng
          }) :
          updateEndLocation(
            {y: lat, 
              x: lng
            });
        
      }}
      options={{
        types: ["address"],
        componentRestrictions: { country: "ca" },
      }}
      style={{ padding: "10px", borderRadius: "5px", width: "80%"}}
      defaultValue="Toronto"
      className={props.className}
    />
  );
};

export default AutocompleteSearch;
