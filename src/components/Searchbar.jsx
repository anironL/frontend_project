import { useContext } from 'react'
import { SearchbarContext } from '../providers/SearchbarProvider';


export default function Searchbar(props) {
  // const [distFilter, setDistFilter] = useState("50000")
  const { distFilter, updateDistFilter } = useContext(SearchbarContext);
  
  return (
    <section style={ {color: "white", backgroundColor: "Green", width: "100%"} }>
      
      <h1> Finding distance around: </h1>
      <p> {props.pois[0].id} {props.pois[0].title}: {props.pois[0].latitude}, {props.pois[0].longitude} </p>
      
      Search (m): 
      
      <input 
        onChange={(e => {
          updateDistFilter(e.target.value)
          console.log(distFilter)
        })}
        value={distFilter.distance} 
        placeholder='Search Distance' 
      />   

    </section>
  )
}