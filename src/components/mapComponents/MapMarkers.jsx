import { useContext } from "react"
import { Marker, Popup, useMap } from 'react-leaflet'
import { SearchbarContext } from "../../providers/SearchbarProvider";

export default function MapMarkers(props) {
  const map = useMap()
  const { updateStartLocation, updateEndLocation } = useContext(SearchbarContext);

  let currentZoom = map.getZoom();
  console.log("zoom", currentZoom)

  return (
    <Marker
      key={props.point.id}
      position={[
        props.point.latitude,
        props.point.longitude
      ]}
    >
      <Popup>
        {props.point.name}
        <button
          onClick={() => {
            updateStartLocation({latitude: props.point.latitude, longitude: props.point.longitude});
            
            map.setView([props.point.latitude, props.point.longitude], currentZoom)
          }
          }
            >
            Set Start Location
        </button>
        <button
          onClick={() => updateEndLocation({y: props.point.latitude, x: props.point.longitude})}>
            Set Destination
        </button>
      </Popup>
    </Marker>
  )
}
