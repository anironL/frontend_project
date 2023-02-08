import { useMapEvents } from 'react-leaflet'
import { useState } from 'react';
import L from "leaflet";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

export default function useClickLocation(props) {
  // console.log("pois " + JSON.stringify(props));
    const [pois, setPois] = useState(props);
    const [markers, setMarkers] = useState([]);
    
// add name field? default start or route to?

    function NewPoint() {
      const map = useMapEvents({
        click: (e) => {
          // console.log(pois)
          const { lat, lng } = e.latlng;
          let marker;
          if (markers.length > 0) {
            map.removeLayer(markers[0]);
          }
          marker = L.marker([lat, lng], { icon });
          marker
            .addTo(map)
            .bindPopup(`Added point at ${lat},${lng}.<br/><br/><button id="confirm-save">Save</button>`, {
              closeButton: true,
              closeOnClick: true,
              autoClose: true,
              autoPan: true
            })
            .openPopup();
    
          document.getElementById("confirm-save").addEventListener("click", function(e) {
            setPois(prevPois => [...prevPois, {id: Date.now(), title: "Fake Title", latitude: lat, longitude: lng}]);
            marker.closePopup();
          });
          
          marker.on("popupclose", function(e) {
            map.removeLayer(marker);
            setMarkers([]);
          });
    
          setMarkers([marker]);
        }
      });
      return null;
    }
  return {
    NewPoint,
    pois
  }
}
