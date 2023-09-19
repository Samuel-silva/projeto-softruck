// import { useCallback, useState } from 'react';
import './Map.scss';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  // const [map, setMap] = useState(null);

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  // }, [])

  // const onUnmount = useCallback(function callback(map) {

  // }, [])

  return (
    <>
      <div className="map flex-grow-1">
        <LoadScript
          googleMapsApiKey="AIzaSyDFSOp0MewUfhamxmuxlp4mR8ydNo1Xfg4"
          libraries={["places"]}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
}

export default Map;