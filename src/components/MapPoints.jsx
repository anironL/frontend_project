import Routing from './Routing'
import { useState, useEffect, useContext } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getMapBounds, filterDistance } from '../helpers/map_helpers'
import useClickLocation from '../hooks/useSaveClickLocation';
import { SearchbarContext } from "../providers/SearchbarProvider";


export default function MapPoints(props) {
  const { distFilter } = useContext(SearchbarContext)
  // console.log("props", props)
  const { NewPoint, pois } = useClickLocation(props.pois);
  // const [distFilter, setDistFilter] = useState("50000")
  
  // console.log("distfilter mappoints", distFilter)
  let poisDistFiltered = filterDistance(pois[0], pois,distFilter.distance)
  // geolocation point (working!)
  // let poisDistFiltered = filterDistance(props.location.coordinates, pois, distFilter)

  return (
    // <section style={ {color: "white", backgroundColor: "Green", width: "100%"} }>
    //   <h1> Finding distance around: </h1>
    //   <p> {pois[0].id} {pois[0].title}: {pois[0].latitude}, {pois[0].longitude} </p>
      
    //   Search (m): 
      
    //   <input 
    //   onChange={(e => setDistFilter(e.target.value))}
    //   value={distFilter} 
    //   placeholder='Search Distance' 
    //   />   

    <MapContainer bounds={getMapBounds(pois)} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

      {props.location.loaded && !(props.location.error) && (
        <Marker position = {[
          props.location.coordinates.latitude,
          props.location.coordinates.longitude
        ]
      } 
      />
      )}  
      {poisDistFiltered.map(point => (
      // {pois.map(point => (
        <Marker
          key={point.id}
          position={[
            point.latitude,
            point.longitude
          ]}
        >
          <Popup>
            {point.title}
          </Popup>
        </Marker>
      ))}
        {props.location.loaded && <Routing location={props.location} />}
      <NewPoint />
        
    </MapContainer>
    // </section>
    )
}