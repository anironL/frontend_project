// Components
import MapMarkers from './MapMarkers';
import LeafletGeoSearch from './LeafletGeoSearch'
import Routing from './Routing'
// Hooks, Helpers, & Providers
import { useContext } from "react"
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import useClickLocation from '../../hooks/useSaveClickLocation';
import { getMapBounds, filterDistance, filterKey } from '../../helpers/map_helpers.js'
import { SearchbarContext } from "../../providers/SearchbarProvider";

export default function MapOnly(props) {
  const { distFilter,  geolocation, startLocation, livelocation } = useContext(SearchbarContext);
  const { NewPoint, pois } = useClickLocation(props.pois);
  
  let poisDistFiltered = filterDistance(startLocation, pois,distFilter.distance)

  if (geolocation === true) {
    poisDistFiltered = filterDistance(livelocation.coordinates, pois, distFilter.distance)
  } else {
    poisDistFiltered = filterDistance(startLocation, pois, distFilter.distance)
  }

  let poisKeyFiltered = filterKey( distFilter, poisDistFiltered)
  

  return (
    <MapContainer bounds={getMapBounds(props.pois)} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
      
      {livelocation.loaded && !(livelocation.error) && (
        <Marker position = {[
          livelocation.coordinates.latitude,
          livelocation.coordinates.longitude
        ]
      } 
      />
      )}  
      {poisKeyFiltered.map(point => (
        <MapMarkers 
          key = {point.id}
          point = {point}
        />
      ))}
        {livelocation.loaded && <Routing location={livelocation} />}
      <NewPoint />
      <LeafletGeoSearch />
        
    </MapContainer>
    )
}