import { useState } from 'react'

const [distFilter, setDistFilter] = useState("50000")

return (
  <section style={ {color: "white", backgroundColor: "Green", width: "100%"} }>
    <h1> Finding distance around: </h1>
    <p> {pois[0].id} {pois[0].title}: {pois[0].latitude}, {pois[0].longitude} </p>
    
    Search (m): 
    
    <input 
    onChange={(e => setDistFilter(e.target.value))}
    value={distFilter} 
    placeholder='Search Distance' 
    />   
  </section>
)