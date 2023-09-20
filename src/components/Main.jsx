import './Main.scss';
import Sidebar from "./Sidebar/Sidebar";
import Map from './Map/Map';
import { useState } from 'react';

function Main() {
  const [course, setCourse] = useState([])
  const dataRoute = (data) => {
    setCourse(data);
  };

  return (
    <main className="main">
      <div className="d-flex main__container w-100">
        <Sidebar setDataRoute={dataRoute} />
        <Map dataCourse={course} />
      </div>
    </main>
  )
}

export default Main;