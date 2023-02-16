// Components
import { MemoizedMapMarkers } from './MapMarkers';
import { MemoizedRouting } from './Routing'
import { MemoizedMapRouting } from './MapRouting';


// Hooks, Helpers, & Providers 
import { useContext, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import useSaveClickLocation from '../../hooks/useSaveClickLocation';
import { getMapBounds, filterDistance, filterKey } from '../../helpers/map_helpers.js';
import { SearchbarContext } from "../../providers/SearchbarProvider";
import L from "leaflet";

export default function MapOnly(props) {
  const { distFilter,  geolocation, startLocation, endLocation, livelocation, routeCoords, routingView, mapCenterView, setMapCenterView, currentTheme } = useContext(SearchbarContext);
  const { NewPoint, pois } = useSaveClickLocation(props.pois);
  
  let poisDistFiltered = filterDistance(startLocation, pois,distFilter.distance)

  if (geolocation === true) {
    poisDistFiltered = filterDistance(livelocation.coordinates, pois, distFilter.distance)
  } else {
    poisDistFiltered = filterDistance(startLocation, pois, distFilter.distance)
  }



  const tileTheme = useMemo(() => {
    console.log("tiletheme" + currentTheme);
    if (currentTheme === "dark") {
     return "dark-tiles"}
     return "light-tiles";
  }, [currentTheme]);
  
  console.log(tileTheme);

  let poisKeyFiltered = filterKey( distFilter, poisDistFiltered);
   
  // Listen for changes to the mapCenterView state and update the map center

  return (
    <MapContainer bounds={getMapBounds(poisKeyFiltered)} scrollWheelZoom={true}>
<TileLayer
key={tileTheme}
  className={tileTheme}
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
      
      {geolocation === true && livelocation.loaded && !(livelocation.error) && (
        <Marker position = {[
          livelocation.coordinates.latitude,
          livelocation.coordinates.longitude
        ]
      } 
      />
      )}  
      {poisKeyFiltered.map(point => (
        <MemoizedMapMarkers 
          key = {point.id}
          point = {point}
        />
      ))}
      {routingView && routeCoords.length > 0 && 
        <MemoizedMapRouting 
          pois = {pois}
        />}

        {routingView && livelocation.loaded && <MemoizedRouting location={livelocation} />}
      <NewPoint />
    </MapContainer>
    )
}