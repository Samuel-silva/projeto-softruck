import './Map.scss';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -19.91877543638059,
  lng: -43.93870860610007
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDFSOp0MewUfhamxmuxlp4mR8ydNo1Xfg4"
  })

  return (
    <>
      <div className="map flex-grow-1">
        {
          isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={17}
            >
              {
                <Marker position={center} options={{
                  label: {
                    text: "Hello world",
                    className: "map__marker-label"
                  }
                }} />
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