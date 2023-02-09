import { useContext } from 'react'
import useGeolocation from '../hooks/useGeolocation';
import { SearchbarContext } from '../providers/SearchbarProvider';

export default function GeolocationConditional() {
  const { updateLivelocation } = useContext(SearchbarContext)

  let location = useGeolocation()

  updateLivelocation(location);
  console.log("Conditional render go")

  return (
    <p>Geolocation Component Rendering</p>
  )
}