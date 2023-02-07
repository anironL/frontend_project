import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getMapBounds } from '../helpers/map_helpers'
import Routing from './Routing'

  export default function MapPoints(props) {

   return (
   <MapContainer bounds={getMapBounds(props.pois)} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    {props.location.loaded && !props.location.error && (
      <Marker position = {[
          props.location.coordinates.latitude,
          props.location.coordinates.longitude
        ]
      } 
      />
    )}

      {props.pois.map(point => (
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
       <Routing location={ props.location } />
  </MapContainer>)
  }