import './Map.scss';
import pin from "../../image/cars.png";
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -19.91877543638059,
  lng: -43.93870860610007
};

function Map(props) {
  const { dataCourse } = props;
  const [positions, setPositions] = useState([])
  const [initialMarker, setInitialMarker] = useState(center)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDFSOp0MewUfhamxmuxlp4mR8ydNo1Xfg4"
  })

  function getCoordinates(data) {
    const list = [];
    const newInitial = {};

    if (data.length > 0) {
      data.forEach(coordinate => {
        const { latitude: lat, longitude: lng } = coordinate;
        list.push({ lat, lng });
      })

      setPositions(list);
      Object.assign(newInitial, {
        lat: list[0].lat,
        lng: list[0].lng,
      });
      setInitialMarker(newInitial);
    }
  }

  useEffect(function () {
    getCoordinates(dataCourse);
  }, [dataCourse]);

  return (
    <>
      <div className="map flex-grow-1">
        {
          isLoaded ? (
            <GoogleMap
              center={initialMarker}
              mapContainerStyle={containerStyle}
              zoom={17}
            >
              {
                <Marker
                  position={initialMarker}
                  // options={{
                  //   label: {
                  //     text: "Hello world",
                  //     className: "map__marker-label"
                  //   }
                  // }}
                  icon={{
                    anchor: { x: 25, y: 26 },
                    origin: { x: 0, y: 0 },
                    size: { width: 50.3, height: 50.3 },
                    scaledSize: { width: 6080, height: 50.3 },
                    url: pin
                  }}
                />
              }
              <></>
            </GoogleMap>
          ) : <></>
        }
      </div>
    </>
  )
}

export default Map;