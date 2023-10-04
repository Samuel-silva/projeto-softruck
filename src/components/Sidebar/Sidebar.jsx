import './Sidebar.scss';
import { Accordion, Alert, ListGroup, Spinner } from 'react-bootstrap';
import { useFetchVehicle } from '../../api/useFetchVehicle';
import { useEffect, useState } from 'react';
import { dateFormat } from '../../util';
import * as Icon from 'react-bootstrap-icons';

function Sidebar(props) {
  const { data, erro, loading } = useFetchVehicle();
  const [infoVehicle, setInfoVehicle] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  let container, imgCar;

  const listOfVehicle = (data) => {
    const list = [];
    data.forEach((element) => {
      const { vehicle, courses } = element;
      list.push({ vehicle, courses });
    });
    setInfoVehicle(list);
  }

  const createRoute = (indexVehicle, indexRoute) => {
    props.setDataRoute(data[indexVehicle].courses[indexRoute].gps);
  };

  useEffect(function () {
    listOfVehicle(data);
    setLoadingList(loading);
  }, [data, loading])

  if (loadingList) {
    container = <div className='d-flex justify-content-center pt-3'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>;
  } else if (erro) {
    container = <Alert variant="danger">
      Não foi possível carregar a lista de veículos no momento, tente novamente.
    </Alert>
  } else {
    const items = infoVehicle?.map((data, index) => {
      const links = data.courses.map((course, indexCourse) => {
        return (
          <ListGroup.Item action key={indexCourse} data-index={indexCourse} onClick={_ => createRoute(index, indexCourse)}>
            {dateFormat(course.start_at)}
          </ListGroup.Item>
        )
      })

      if (data.vehicle.picture.address) {
        imgCar = <img className='sidebar__car-image--img w-100' src={data.vehicle.picture.address} alt={data.vehicle.plate} />
      } else {
        imgCar = <Icon.CarFrontFill size={20} />
      }

      return (
        <Accordion.Item eventKey={data.vehicle.plate} key={index}>
          <Accordion.Header className='sidebar__item'>
            <div className='sidebar__car-image d-flex align-items-center justify-content-center'>
              {imgCar}
            </div>
            <span className='ps-2 text-dark'><b>Placa:</b> {data.vehicle.plate}</span>
          </Accordion.Header>
          <Accordion.Body className='px-1'>
            <ListGroup variant="flush">
              {links}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      );
    })
    container = <Accordion flush>{items}</Accordion>;
  }

  return (
    <>
      <section className="sidebar px-2 py-4">
        <h2 className="h6 pb-3"><b>Selecione o veículo e a rota:</b></h2>
        {container}
      </section>
    </>
  )
}

export default Sidebar;
