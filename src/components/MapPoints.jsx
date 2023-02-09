import Routing from './Routing'
import { useContext } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { getMapBounds, filterDistance, filterKey } from '../helpers/map_helpers'
import useClickLocation from '../hooks/useSaveClickLocation';
import { SearchbarContext } from "../providers/SearchbarProvider";
import LeafletGeoSearch from './LeafletGeoSearch'

export default function MapPoints(props) {
  const { distFilter,  geolocation, startLocation, updateStartLocation, updateEndLocation, livelocation } = useContext(SearchbarContext);
  const { NewPoint, pois } = useClickLocation(props.pois);
  
  // console.log(props.location)

  let poisDistFiltered = filterDistance(startLocation, pois,distFilter.distance)
  // console.log(geolocation)

  if (geolocation === true) {
    poisDistFiltered = filterDistance(livelocation.coordinates, pois, distFilter.distance)
  } else {
    // set to user defined point
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
        <Marker
          key={point.id}
          position={[
            point.latitude,
            point.longitude
          ]}
        >
          <Popup>
            {point.name}
            <button
              onClick={() => updateStartLocation({latitude: point.latitude, longitude: point.longitude})}>
                Set Start Location
            </button>
            <button
              onClick={() => updateEndLocation({y: point.latitude, x: point.longitude})}>
                Set Destination
            </button>
          </Popup>
        </Marker>
      ))}
        {livelocation.loaded && <Routing location={livelocation} />}
      <NewPoint />
      <LeafletGeoSearch />
        
    </MapContainer>
    )
}