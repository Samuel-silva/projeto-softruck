import './Main.scss';
import Sidebar from "./Sidebar/Sidebar";
import Map from './Map/Map';

function Main() {
  const dataRoute = (data) => {
    console.log(data);
  };

  return (
    <main className="main">
      <div className="d-flex main__container w-100">
        <Sidebar setDataRoute={dataRoute} />
        <Map />
      </div>
    </main>
  )
}

export default Main;