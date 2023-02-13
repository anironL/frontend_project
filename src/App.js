// Components
import './App.css';
import Header from './components/headerComponents/Header';
// import Header from "./components/Header.jsx";
import MapOnly from './components/mapComponents/MapOnly';
import GeolocationConditional from './components/GeolocationConditional';

// Hooks & libraries
import { useContext, useState } from 'react'
import { SearchbarContext } from './providers/SearchbarProvider';
import useAPI from './hooks/useAPI';
import Footer from './components/footerComponents/Footer';
import AddLocation  from './components/footerComponents/AddLocation';



function App() { 
  console.log("Main load")
  const { state, savePoint } = useAPI();

  const { geolocation } = useContext(SearchbarContext);


  return (
    <section>
        {geolocation === true && <GeolocationConditional />}
      <div className="App">
        <div className="App-header" >
        <Header className="page-header" /> 
          {state.washrooms.length > 0 && <MapOnly
            pois={state.washrooms}
            savePoint = {savePoint}
            />}
        <Footer 
          className="footer-menu"
          />
        {/* <AddLocation className='footer-menu'/> */}
        </div>
      </div>
    </section>
  );
}

export default App;

// old hardcoded data (delete later)
// let pois = [
//   { id: 1, title: "CN Tower", longitude: -79.3872, latitude: 43.6426, keys: ["key1", "key2", "key3"] },
//   { id: 2, title: "Toronto Zoo", longitude: -79.1745, latitude: 43.8249, keys: ["key1"] },
//   { id: 3, title: "Ripley's Aquarium of Canada", longitude: -79.3870, latitude: 43.6441, keys: ["key1", "key2"] },
//   { id: 4, title: "Royal Ontario Museum", longitude: -79.3944, latitude: 43.6678, keys: ["key1", "key2"] },
//   { id: 5, title: "Art Gallery of Ontario", longitude: -79.3941, latitude: 43.6541, keys: ["key1", "key3"] },
//   { id: 6, title: "Kensington Market", longitude: -79.4146, latitude: 43.6559, keys: ["key1", "key2"] },
//   { id: 7, title: "High Park", longitude: -79.4645, latitude: 43.6485, keys: ["key1"] },
//   { id: 8, title: "Toronto Islands", longitude: -79.3757, latitude: 43.6224, keys: ["key1", "key2"] },
//   { id: 9, title: "St. Lawrence Market", longitude: -79.3717, latitude: 43.6508, keys: ["key2"] },
//   { id: 10, title: "Edwards Gardens", longitude: -79.3495, latitude: 43.7473, keys: ["key1", "key2"] },
//   { id: 11, title: "Toronto Botanical Garden", longitude: -79.3596, latitude: 43.7195, keys: ["key1", "key2"] },
//   { id: 12, title: "Distillery District", longitude: -79.3519, latitude: 43.6506, keys: ["key1", "key2"] },
//   { id: 13, title: "Casa Loma", longitude: -79.4098, latitude: 43.6780, keys: ["key1", "key2"] },
//   { id: 14, title: "Rogers Centre", longitude: -79.3913, latitude: 43.6426, keys: ["key1"] },
//   { id: 15, title: "Toronto Eaton Centre", longitude: -79.3809, latitude: 43.6535, keys: ["key1", "key2"] },
//   { id: 16, title: "Hockey Hall of Fame", longitude: -79.3772, latitude: 43.6466, keys: ["key1", "key2"] },
//   { id: 17, title: "Bata Shoe Museum", longitude: -79.4005, latitude: 43.6708, keys: ["key1", "key2"] },
//   { id: 18, title: "Toronto Public Library - Lillian H. Smith Branch", longitude: -79.3942, latitude: 43.6660, keys: ["key1", "key2"] },
//   { id: 19, title: "The Gardiner Museum", longitude: -79.3898, latitude: 43.6619, keys: ["key1"] },
//   { id: 20, title: "Allan Gardens", longitude: -79.3703, latitude: 43.6573, keys: ["key1", "key2"] },
//   { id: 21, title: "Toronto City Hall", longitude: -79.3832, latitude: 43.6532, keys: ["key2"] },
//   { id: 22, title: "The Beach", longitude: -79.2997, latitude: 43.6760, keys: ["key1", "key2"] },
//   { id: 23, title: "The Toronto Music Garden", longitude: -79.3838, latitude: 43.6361, keys: ["key2"] }
// ];
