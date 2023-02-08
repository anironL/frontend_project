import Routing from './Routing'
import { useContext } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getMapBounds, filterDistance, filterKey } from '../helpers/map_helpers'
import useClickLocation from '../hooks/useSaveClickLocation';
import { SearchbarContext } from "../providers/SearchbarProvider";
import LeafletGeoSearch from './LeafletGeoSearch'

export default function MapPoints(props) {
  const { distFilter, updateKeys, updateDistFilter, geolocation, toggleGeolocation } = useContext(SearchbarContext);
  const { NewPoint, pois } = useClickLocation(props.pois);
  
  let poisDistFiltered = filterDistance(pois[0], pois,distFilter.distance)

  if (geolocation === true) {
    poisDistFiltered = filterDistance(props.location.coordinates, pois, distFilter.distance)
    console.log("Geolocation on:", props.location.coordinates)
  } else {
    // set to user defined point
    poisDistFiltered = filterDistance(pois[0], pois, distFilter.distance)
    console.log("No geolocation", pois[0])
  }

  let poisKeyFiltered = filterKey( distFilter, poisDistFiltered)

  return (
    <MapContainer bounds={getMapBounds(props.pois)} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

      {props.location.loaded && !(props.location.error) && (
        <Marker position = {[
          props.location.coordinates.latitude,
          props.location.coordinates.longitude
        ]
      } 
      />
      )}  
      {poisKeyFiltered.map(point => (
        <Marker
          key={point.id}
          position={[
            point.latitude,
            point.longitude
          ]}
        >
          <Popup>
            {point.title}
          </Popup>
        </Marker>
      ))}
        {props.location.loaded && <Routing location={props.location} />}
      <NewPoint />
      <LeafletGeoSearch />
        
    </MapContainer>
    )
}