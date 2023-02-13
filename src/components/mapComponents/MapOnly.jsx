// Components
import { MemoizedMapMarkers } from './MapMarkers';
import { MemoizedLeafletGeoSearch } from './LeafletGeoSearch'
import { MemoizedRouting } from './Routing'
import { MemoizedMapRouting } from './MapRouting';


// Hooks, Helpers, & Providers
import { useContext, memo, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import useSaveClickLocation from '../../hooks/useSaveClickLocation';
import { getMapBounds, filterDistance, filterKey } from '../../helpers/map_helpers.js'
import { SearchbarContext } from "../../providers/SearchbarProvider";

export default function MapOnly(props) {
  const { distFilter,  geolocation, startLocation, livelocation, routeCoords } = useContext(SearchbarContext);
  const { NewPoint, pois } = useSaveClickLocation(props.pois);
  
  let poisDistFiltered = filterDistance(startLocation, pois,distFilter.distance)

  if (geolocation === true) {
    poisDistFiltered = filterDistance(livelocation.coordinates, pois, distFilter.distance)
  } else {
    poisDistFiltered = filterDistance(startLocation, pois, distFilter.distance)
  }

  let poisKeyFiltered = filterKey( distFilter, poisDistFiltered)


  return (
    <MapContainer bounds={getMapBounds(poisKeyFiltered)} scrollWheelZoom={true}>
        <TileLayer
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
      {routeCoords.length > 0 && 
        <MemoizedMapRouting 
          pois = {pois}
        />}

        {livelocation.loaded && <MemoizedRouting location={livelocation} />}
      <NewPoint />
      <MemoizedLeafletGeoSearch />
        
    </MapContainer>
    )
}


