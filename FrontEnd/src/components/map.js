import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useEffect } from "react";
function Map(props)
  {
    const containerStyle = {
      width: '1000px',
      height: '580px'
    };
    
    const center = {
      lat: props.latitude,
      lng: props.longitude
    };

    //console.log(center)
  
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyCWP8M3adjFEXNp34quR6X5mPO0Ch4pwaY"
    })
  
    const [map, setMap] = React.useState(null)
  
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])
  
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          defaultZoom={20}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
    ) : <></>
  }

  export default Map