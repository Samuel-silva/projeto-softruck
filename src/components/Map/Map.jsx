import './Map.scss';
import pin from "../../image/cars.png";
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useSpring } from "@react-spring/web";
import { dateFormat } from '../../util';
import { REACT_APP_GOOGLE_API_KEY } from "../../App";

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
const widthOnlyCarIcon = 152 / 3;
const numberIconsImage = 120;

const speedDefault = 5000;

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
  const [speed, setSpeed] = useState(speedDefault)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_API_KEY
  })

  const getCoordinates = (data) => {
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
    config: { duration: speed - 100 },
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

    const angle = (Math.atan2(lngDiff, latDiff) * 180.0) / Math.PI;
    let result = 0;

    if (angle < 0) {
      result = (((angle * -1) * (spriteWidthScale / 2)) / 180) + (spriteWidthScale / 2);
      result = result / widthOnlyCarIcon;
      result = (Math.floor(result)) * widthOnlyCarIcon;
    } else {
      result = (angle * (spriteWidthScale / 2)) / 180;
      result = result / widthOnlyCarIcon;
      result = ((numberIconsImage / 2) - Math.floor(result)) * widthOnlyCarIcon;
    }

    return { x: result, y: 0 }
  };

  const customLabel = (currentPos) => {
    const options = { month: 'numeric', day: 'numeric', hour: "numeric", minute: "numeric" };
    const text = `${currentPos + 2}/${dataCourse.length} - ${dateFormat(dataCourse[currentPos + 1].acquisition_time, options)}`;
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
    calcSpeed(newCurrentPos);
    springs.val.reset();
    springs.val.start();
  };

  const calcSpeed = (newCurrentPos) => {
    let calc = speedDefault;

    if (!!dataCourse[newCurrentPos + 1]) {
      const currentSpeed = dataCourse[newCurrentPos + 1].speed;
      calc = speedDefault - (Math.floor(currentSpeed) * 25);
      calc = calc < 2000 ? 2000 : calc;
    }

    setSpeed(calc);
  }

  const doUpdate = () => {
    const newCurrentPos = currentPos + 1;
    if (newCurrentPos >= positions.length) return;

    animate(newCurrentPos);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      doUpdate();
    }, speed);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [currentPos]);

  useEffect(function () {
    setCurrentLabel(initialLabel);
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