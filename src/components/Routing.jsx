import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing(props) {
  //console.log(typeof props.location.coordinates.latitude)
  const map = useMap();

  const endDestination = [];
  // map.on('click', (e) => {
  //   endDestination.push(e.latlng.lat, e.latlng.lng)
  // });

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      // waypoints: [start destination, end destination]
      waypoints: [L.latLng(props.location.coordinates.latitude, props.location.coordinates.longitude), L.latLng(43.648905479972626, -79.39128660489602)],
      routeWhileDragging: true
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}