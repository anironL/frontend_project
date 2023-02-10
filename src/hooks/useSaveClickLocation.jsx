import L from "leaflet";
import { useState, useContext } from 'react';
import { useMapEvents } from 'react-leaflet'
import useAPI from './useAPI';
import { SearchbarContext } from '../providers/SearchbarProvider';

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

export default function useSaveClickLocation(props) {
    const [pois, setPois] = useState(props);
    const [markers, setMarkers] = useState([]);
    const { startLocation, updateStartLocation, updateEndLocation } = useContext(SearchbarContext);
    const { savePoint } = useAPI();
    
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
            .bindPopup(`
              Added point at ${lat},${lng}.
              <br/><br/>
              <form>
              <label for="title">Title:</label>
              <input type="text" id="title" name="name" value="Fake Title"><br><br>
            
              <label for="key1">Key 1:</label>
              <input type="checkbox" id="key1" name="key1" value="false"><br><br>
            
              <label for="key2">Key 2:</label>
              <input type="checkbox" id="key2" name="key2" value="false"><br><br>
            
              <label for="key3">Key 3:</label>
              <input type="checkbox" id="key3" name="key3" value="false"><br><br>
            
              <input type="submit" id="confirm-save" value="Submit">
            </form>
          
              <button id="set-start-pos"}>
              Set Start Location
              </button>
              <button id="set-end-pos"}>
              Set End Location
              </button>`, {
              closeButton: true,
              closeOnClick: true,
              autoClose: true,
              autoPan: true
            })
            .openPopup();

          document.getElementById("confirm-save").addEventListener("click", function(e) {
            e.preventDefault();
            // Get the values from the form
            const title = document.getElementById("title").value;
            const key1 = document.getElementById("key1").checked;
            const key2 = document.getElementById("key2").checked;
            const key3 = document.getElementById("key3").checked;
            const keyArr = [[key1, "key1"], [key2, "key2"], [key3, "key3"]];
            const newArr = [];
            keyArr.forEach(key => key[0]? newArr.push(key[1]): "");
            const newWashroom = {
              name: title,
              latitude: lat,
              longitude: lng,
              keys: newArr
            };
            console.log(newWashroom);
        
            savePoint(newWashroom)
              .then((res) => {
                //Sets the appointments state to trigger rerender
                setPois(prevPois => [...prevPois, newWashroom])
            })
              .catch((error) => {
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.response.data);
            });
            marker.closePopup();
          });

          document.getElementById("set-start-pos").addEventListener("click", function(e) {
            updateStartLocation({latitude: lat, longitude: lng});
            marker.closePopup();
            console.log(startLocation)
          });

          document.getElementById("set-end-pos").addEventListener("click", function(e) {
            updateEndLocation({y: lat, x: lng});
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
