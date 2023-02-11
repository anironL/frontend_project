import { Marker } from 'react-leaflet'

export default function MapRoutingMarkers(props) {
  // const map = useMap()
  
  return (
    <Marker
      key={props.key}
      position={[
        props.point.latitude,
        props.point.longitude
      ]}
      ></Marker>
  )
}
