import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import { useContext } from "react"
import { Marker, Popup, useMap } from 'react-leaflet'
import { SearchbarContext } from "../../providers/SearchbarProvider";
import { filterKey, filterDistance } from "../../helpers/map_helpers.js";
import MapRoutingMarkers from "./MapRoutingMarkers";

export default function MapRouting(props) {
  const map = useMap()
  const { distFilter, routeCoords } = useContext(SearchbarContext);

  let routePointsArray = []; 

  routeCoords.map(point => {
    let routePointsDistFiltered = filterDistance(
      {latitude: point.coords.lat, longitude: point.coords.lng}, 
      props.pois,
      distFilter.distance
    )
    let routePointsKeyFiltered = filterKey( 
      routePointsDistFiltered, 
      routePointsDistFiltered
    )

    for (let poi of routePointsKeyFiltered) {
      if (!routePointsArray.find(item => item.id === poi.id)){
        routePointsArray.push(poi)
      }
    }
  })
  
  return (
    <div>
      {routePointsArray.map(point => (
        <MapRoutingMarkers  
          key = {point.id}
          point = {point}
        />
      ))}
    </div>
  )
}