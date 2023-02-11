import { useContext } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import { SearchbarContext } from '../../providers/SearchbarProvider';

export default function MapRoutingMarkers(props) {
  const map = useMap()
  const { updateStartLocation, updateEndLocation } = useContext(SearchbarContext);
  
  map.on('popupopen', function(e) {
    var px = map.project(e.popup._latlng);
    px.y -= e.popup._container.clientHeight/2;
    map.panTo(map.unproject(px), {animate: true});
  });

  return (
    <Marker
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
            
            map.setView([props.point.latitude, props.point.longitude])
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
