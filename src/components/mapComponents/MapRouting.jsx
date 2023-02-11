import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import React, { useContext, memo } from "react"
import { Marker, Popup, useMap } from 'react-leaflet'
import { SearchbarContext } from "../../providers/SearchbarProvider";
import { filterKey, filterDistance } from "../../helpers/map_helpers.js";
import MapRoutingMarkers from "./MapRoutingMarkers";

export function MapRouting (props) {
  const map = useMap()
  const { startLocation, distFilter, routeCoords } = useContext(SearchbarContext);

  let routePointsArray = []; 
  
  routeCoords.map(point => {
    console.log("Point array firing")
    
    let routePointsDistFiltered = filterDistance(
      {latitude: point.coords.lat, longitude: point.coords.lng}, 
      props.pois,
      distFilter.distance
    )
    let routePointsKeyFiltered = filterKey( 
      distFilter, 
      routePointsDistFiltered
    )

    for (let poi of routePointsKeyFiltered) {
      if (!routePointsArray.find(item => item.id === poi.id)){
        routePointsArray.push(poi)
      }
    }

    // console.log("PoIs on route", routePointsArray)
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

export const MemoizedMapRouting = React.memo(MapRouting)