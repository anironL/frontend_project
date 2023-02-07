import { useState } from 'react'
import useFilterDistance from '../hooks/useFilterDistance';


export default function Searchbar(props) {
  const [distFilter, setDistFilter] = useState("50000")
  // const { distFilter, updateDistFilter } = useFilterDistance
  
  return (
    <section style={ {color: "white", backgroundColor: "Green", width: "100%"} }>
      <h1> Finding distance around: </h1>
      <p> {props.pois[0].id} {props.pois[0].title}: {props.pois[0].latitude}, {props.pois[0].longitude} </p>
      
      Search (m): 
      
      <input 
      onChange={(e => setDistFilter(e.target.value))}
      value={distFilter} 
      placeholder='Search Distance' 
      />   
    </section>
  )
}