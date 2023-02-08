import { useContext } from 'react'
import { SearchbarContext } from '../providers/SearchbarProvider';


export default function Searchbar() {
  const { distFilter, updateKeys, updateDistFilter } = useContext(SearchbarContext);
  
  return (
    <section style={ {color: "white", backgroundColor: "Green", width: "100%"} }>
      
      <h1> Searchbar component</h1>
      
      Search (m):       
      <input 
        onChange={(e => {
          updateDistFilter(e.target.value)
          // console.log(distFilter)
        })}
        value={distFilter.distance} 
        placeholder='Search Distance' 
      />   

      <button
        onClick={() => updateKeys("key1")}>
          key1
      </button>

      <button
        onClick={() => updateKeys("key2")}>
          key2
      </button>

      <button
        onClick={() => updateKeys("key3")}>
          key3
      </button>

    </section>
  )
}