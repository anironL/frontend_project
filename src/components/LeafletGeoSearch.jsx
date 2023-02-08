import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";

export default function LeafletGeoSearch() {
  const map = useMap();
  
  /*
  function searchEventHandler(result) {
    console.log("Event handler: ", result.location);
  }

  map.on('geosearch/showlocation', searchEventHandler);
  */
  
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      style: 'button',
      notFoundMessage: 'Sorry, that address could not be found.',
      provider,
      marker: {
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
      }
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
}