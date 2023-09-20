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

const spriteWidthScale = 18240 / 3;
const spriteHeightScale = 151 / 3;
const widthOnlyCarIcon = 152;

const initialLabel = {
  label: {
    text: "",
    className: "map__marker-label--hide"
  }
}

function Map(props) {
  const { dataCourse } = props;
  const [positions, setPositions] = useState([])
  const [coordinate, setCoordinate] = useState(defaultCoordinate)
  const [currentPos, setCurrentPos] = useState(-1);
  const [currentRotate, setCurrentRotate] = useState({ x: 0, y: 0 });
  const [currentLabel, setCurrentLabel] = useState(initialLabel);

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

  const getRotation = (cPos, nPos) => {
    if (!cPos || !nPos) {
      return { x: 0, y: 0 };
    }
    const latDiff = cPos.lat - nPos.lat;
    const lngDiff = cPos.lng - nPos.lng;

    let angle = (Math.atan2(lngDiff, latDiff) * 180.0) / Math.PI;
    let result = 0;

    if (angle < 0) {
      angle = angle * -1;
      result = ((angle * (spriteWidthScale / 2)) / 180) + (spriteWidthScale / 2);
    } else {
      result = (angle * (spriteWidthScale / 2)) / 180;
    }

    result = result / widthOnlyCarIcon;
    result = (Math.floor(result)) * widthOnlyCarIcon;

    return { x: result, y: 0 }
  };

  function dateFormat(date) {
    const newDate = new Date(date);
    const options = { month: 'numeric', day: 'numeric', hour: "numeric", minute: "numeric" };
    return newDate.toLocaleDateString('pt-BR', options);
  }

  const customLabel = (currentPos) => {
    const text = `${currentPos + 1 }/${dataCourse.length - 1} - ${dateFormat(dataCourse[currentPos].acquisition_time)}`;
    setCurrentLabel({
      label: {
        text,
        className: "map__marker-label"
      }
    });
  }

  const animate = (newCurrentPos) => {
    const newRotate = getRotation(positions[currentPos], positions[newCurrentPos]);
    customLabel(currentPos);
    setCurrentRotate(newRotate);
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
                  options={currentLabel}
                  icon={{
                    anchor: { x: 25, y: 26 },
                    origin: currentRotate,
                    size: { width: spriteHeightScale, height: spriteHeightScale },
                    scaledSize: { width: spriteWidthScale, height: spriteHeightScale },
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