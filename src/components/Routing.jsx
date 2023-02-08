import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing(props) {
  const [endDestination, setEndDestination] = useState(null);
  const map = useMap();
  
  map.on('geosearch/showlocation', (result) => setEndDestination(result.location));
  
  useEffect(() => {
    if (!map) return;
    console.log("routing lat", endDestination)
    const routingControl = L.Routing.control({
      // waypoints: [start destination, end destination]
      waypoints: [L.latLng(props.location.coordinates.latitude, props.location.coordinates.longitude), L.latLng(endDestination?.y, endDestination?.x)],
      routeWhileDragging: true
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [endDestination]);

  return null;
}