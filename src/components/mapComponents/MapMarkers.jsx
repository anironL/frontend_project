import React, { useContext, memo, useEffect, useMemo } from "react"
import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import L from "leaflet";
import { SearchbarContext } from "../../providers/SearchbarProvider";

export function MapMarkers(props) {
  const map = useMap();
  const setViewOnClick = (latlng) => {
    console.log("latlng" + latlng);
    map.setView(latlng, 12);
    return null
  }

  const { updateStartLocation, updateEndLocation, routingView, mapCenterView } = useContext(SearchbarContext);
  
  let currentZoom = map.getZoom();

  const setNewView = (coords) => {
    console.log("newView");
    map.setView(L.latLng(coords.latitude, coords.longitude), currentZoom);}

  useMemo(() => {
    if (mapCenterView) {
      // setNewView(mapCenterView);
    }
  }, [mapCenterView]);

  // console.log("zoom", currentZoom)

  // map.on('popupopen', function(e) {
  //   var px = map.project(e.popup._latlng);
  //   px.y -= e.popup._container.clientHeight/2;
  //   map.panTo(map.unproject(px), {animate: true});
  // });

  return (
    <Marker
      key={props.point.id}
      position={[
        props.point.latitude,
        props.point.longitude
      ]}
      eventHandlers={{
        click: (e) => {
          setViewOnClick(e.latlng);
        },
      }}
    >
      <Popup>
        {props.point.name}

        {routingView && 
        <>
          <button
            onClick={() => {
              updateStartLocation({latitude: props.point.latitude, longitude: props.point.longitude});
              
              map.setView([props.point.latitude, props.point.longitude], currentZoom)
            }
            }
              >
              Set Start Location
          </button>
          <button
            onClick={() => updateEndLocation({y: props.point.latitude, x: props.point.longitude})}>
              Set Destination
          </button>
        </>
        }
      </Popup>
    </Marker>
  )
}

export const MemoizedMapMarkers = React.memo(MapMarkers)