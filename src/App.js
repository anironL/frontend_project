import './App.css';
import MapPoints from './components/MapPoints';
import useGeolocation from './hooks/useGeolocation';

export const pois = [
  { id: 1, title: "CN Tower", longitude: -79.3872, latitude: 43.6426 },
  // { id: 2, title: "Toronto Zoo", longitude: -79.1745, latitude: 43.8249 },
  { id: 3, title: "Ripley's Aquarium of Canada", longitude: -79.3870, latitude: 43.6441 },
  { id: 4, title: "Royal Ontario Museum", longitude: -79.3944, latitude: 43.6678 },
  { id: 5, title: "Art Gallery of Ontario", longitude: -79.3941, latitude: 43.6541 },
  { id: 6, title: "Kensington Market", longitude: -79.4146, latitude: 43.6559 },
  { id: 7, title: "High Park", longitude: -79.4645, latitude: 43.6485 },
  { id: 8, title: "Toronto Islands", longitude: -79.3757, latitude: 43.6224 },
  { id: 9, title: "St. Lawrence Market", longitude: -79.3717, latitude: 43.6508 },
  { id: 10, title: "Edwards Gardens", longitude: -79.3495, latitude: 43.7473 },
  { id: 11, title: "Toronto Botanical Garden", longitude: -79.3596, latitude: 43.7195 },
  { id: 12, title: "Distillery District", longitude: -79.3519, latitude: 43.6506 },
  { id: 13, title: "Casa Loma", longitude: -79.4098, latitude: 43.6780 },
  { id: 14, title: "Rogers Centre", longitude: -79.3913, latitude: 43.6426 },
  { id: 15, title: "Toronto Eaton Centre", longitude: -79.3809, latitude: 43.6535 },
  { id: 16, title: "Hockey Hall of Fame", longitude: -79.3772, latitude: 43.6466 },
  { id: 17, title: "Bata Shoe Museum", longitude: -79.4005, latitude: 43.6708 },
  { id: 18, title: "Toronto Public Library - Lillian H. Smith Branch", longitude: -79.3942, latitude: 43.6660 },
  { id: 19, title: "The Gardiner Museum", longitude: -79.3898, latitude: 43.6619 },
  { id: 20, title: "Allan Gardens", longitude: -79.3703, latitude: 43.6573 },
  { id: 21, title: "Toronto City Hall", longitude: -79.3832, latitude: 43.6532 },
  { id: 22, title: "The Beach", longitude: -79.2997, latitude: 43.6760 },
  { id: 23, title: "The Toronto Music Garden", longitude: -79.3838, latitude: 43.6361 }
];

function App() {

const location = useGeolocation();

// Geolocation snap to map area
// const snapToLocation = () => {
//   if (location.loaded && !location.error) {
//     mapRef.current.leafletElement.flyTo(
//       [ location.coordinates.latitude, location.coordinates.longitude ], 
//       15, //ZOOM_LEVEL
//       {animate: true})
//   } else {
//     alert(location.error.message)
//   }
// }
  

  return (
    <div className="App">
      <header className="App-header">
        <MapPoints
          pois = {pois}
          location = {location}
        />
      </header>
    </div>
  );
}

export default App;
