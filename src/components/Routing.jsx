import { useEffect, useState, useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { SearchbarContext } from "../providers/SearchbarProvider";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing(props) {
  const [endDestination, setEndDestination] = useState(null);
  const { geolocation, startLocation } = useContext(SearchbarContext);
  const map = useMap();
  
  map.on('geosearch/showlocation', (result) => setEndDestination(result.location));

  let startCoords = startLocation
  
  if (geolocation === true){
    startCoords = props.location.coordinates
  }
  
  // console.log("geolocation:", geolocation)
  // console.log("start Coords:", startCoords)
  
  useEffect(() => {
    if (!map) return;
    console.log("routing lat", endDestination)
    const routingControl = L.Routing.control({
      // waypoints: [start destination, end destination]
      waypoints: [L.latLng(startCoords.latitude, startCoords.longitude), L.latLng(endDestination?.y, endDestination?.x)],
      routeWhileDragging: true
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [startCoords, endDestination]);

  return null;
}