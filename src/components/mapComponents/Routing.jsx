import { useEffect, useState, useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { SearchbarContext } from "../../providers/SearchbarProvider";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing(props) {
  // const [endDestination, setEndDestination] = useState(null);
  const { geolocation, startLocation, endDestination, setEndDestination } = useContext(SearchbarContext);
  const map = useMap();
  
  map.on('geosearch/showlocation', (result) => setEndDestination(result.location));

  let startCoords = startLocation;
  
  if (geolocation === true){
    startCoords = props.location.coordinates
  };
  
  let endCoords = endDestination;
  
  // console.log("geolocation:", geolocation)
  // console.log("start Coords:", startCoords)
  
  useEffect(() => {
    if (!map) return;
    // console.log("routing lat", endDestination)
    // const routingControl = L.Routing.control({
    //   // waypoints: [start destination, end destination]
    //   waypoints: [L.latLng(startCoords.latitude, startCoords.longitude), L.latLng(endCoords?.y, endCoords?.x)],
    //   routeWhileDragging: true,

    //   collapsible: true
    // }).addTo(map);

    // console.log(routingControl.getPlan())

    const routingControl = 
      L.Routing.control({
        waypoints: [
            L.latLng(startCoords.latitude, startCoords.longitude),
            L.latLng(endCoords?.y, endCoords?.x)
        ],
        routeWhileDragging: true,
        // geocoder: L.Control.Geocoder.nominatim()
      })
      .on('routesfound', function(e) {
          // var routes = e.routes;
          // alert('Found ' + routes.length + ' route(s).');
          console.log(e)
      })
      .addTo(map);













    return () => map.removeControl(routingControl);
  }, [startCoords, endDestination]);

  return null;
}