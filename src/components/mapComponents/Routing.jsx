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
  const { geolocation, startLocation, endDestination, setEndDestination, routeCoords, updateRouteCoords } = useContext(SearchbarContext);
  const map = useMap();
  
  map.on('geosearch/showlocation', (result) => setEndDestination(result.location));

  let startCoords = startLocation;
  
  if (geolocation === true){
    startCoords = props.location.coordinates
  };
  
  let endCoords = endDestination;
 
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
        collapsible: true,
        showAlternative: false,
        // geocoder: L.Control.Geocoder.nominatim()
      })
      .on('routesfound', function(e) {       
        const coordInterval = 30
        let coordsOnRoute = Math.trunc(e.routes[0].coordinates.length/coordInterval)*coordInterval
          
        let y = 1;
        let routePoints = [{
          key: 0,
          coords: L.latLng(startCoords.latitude, startCoords.longitude)
        }];

        for (let x = coordInterval; x < coordsOnRoute; x+=coordInterval) {
          // console.log(x)
          routePoints.push({
            key: y,
            coords: e.routes[0].coordinates[x]
          })
          y++
        }

        routePoints.push({
          key: y,
          coords: L.latLng(endCoords?.y, endCoords?.x)
        })
  
        updateRouteCoords(routePoints)
      
      })
      .addTo(map);








    return () => map.removeControl(routingControl);
  }, [startCoords, endDestination]);

  return null;
}