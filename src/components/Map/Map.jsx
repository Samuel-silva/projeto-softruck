import './Map.scss';
import pin from "../../image/cars.png";
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useSpring } from "@react-spring/web";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCoordinate = {
  lat: -19.91877543638059,
  lng: -43.93870860610007
};

function Map(props) {
  const { dataCourse } = props;
  const [positions, setPositions] = useState([])
  const [coordinate, setCoordinate] = useState(defaultCoordinate)
  const [currentPos, setCurrentPos] = useState(-1);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDFSOp0MewUfhamxmuxlp4mR8ydNo1Xfg4"
  })

  function getCoordinates(data) {
    const list = [];
    const newInitial = {};

    if (data.length > 0) {
      setCurrentPos(0);

      data.forEach(coordinate => {
        const { latitude: lat, longitude: lng } = coordinate;
        list.push({ lat, lng });
      })

      setPositions(list);
      Object.assign(newInitial, {
        lat: list[0].lat,
        lng: list[0].lng,
      });
      setCoordinate(newInitial);
    }
  }

  const springs = useSpring({
    val: 0,
    from: { val: 1 },
    config: { duration: 1900 },
    onChange: () => {
      const value = springs.val.get();

      if (currentPos > 0) {
        const latDiff =
          (positions[currentPos].lat - positions[currentPos - 1].lat) * value;
        const lngDiff =
          (positions[currentPos].lng - positions[currentPos - 1].lng) * value;
        const newCoord = {
          lat: positions[currentPos].lat - latDiff,
          lng: positions[currentPos].lng - lngDiff,
        };
        setCoordinate(newCoord);
      }
    },
  });

  const animate = (newCurrentPos) => {
    // const newRot = getRotation(positions[curPos], positions[newCurrentPos]);
    // setCurRot(newRot);
    setCurrentPos(newCurrentPos);
    springs.val.reset();
    springs.val.start();
  };

  const doUpdate = () => {
    const newCurrentPos = currentPos + 1;
    if (newCurrentPos >= positions.length) return;

    animate(newCurrentPos);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      doUpdate();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [currentPos]);

  useEffect(function () {
    getCoordinates(dataCourse);
  }, [dataCourse]);

  return (
    <>
      <div className="map flex-grow-1">
        {
          isLoaded ? (
            <GoogleMap
              center={coordinate}
              mapContainerStyle={containerStyle}
              zoom={17}
            >
              {
                <Marker
                  position={coordinate}
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