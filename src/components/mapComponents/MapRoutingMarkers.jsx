import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import { useContext } from "react"
import { Marker, Popup, useMap } from 'react-leaflet'
import { SearchbarContext } from "../../providers/SearchbarProvider";
import { filterKey, filterDistance } from "../../helpers/map_helpers.js";

export default function MapRoutingMarkers(props) {
  const map = useMap()
  const { distFilter, routeCoords } = useContext(SearchbarContext);
  
  return (

    <Marker
      key={props.key}
      position={[
        props.point.latitude,
        props.point.longitude
      ]}
      ></Marker>
    // <></>
  )

}
