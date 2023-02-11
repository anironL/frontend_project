import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import { useContext } from "react"
import { Marker, Popup, useMap } from 'react-leaflet'
import { SearchbarContext } from "../../providers/SearchbarProvider";


export default function MapRoutingMarkers(props) {
  const map = useMap()
  const { routeCoords } = useContext(SearchbarContext);

  console.log("props passed", props.point)
  // console.log("Mapped coordinates", routeCoords.map((e) => e))

  return (
    <Marker
      key={props.key}
      position={[
        props.point.lat,
        props.point.lng
      ]}
      ></Marker>
  )
}