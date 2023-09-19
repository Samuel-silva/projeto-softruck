import './Main.scss';
import Sidebar from "./Sidebar/Sidebar";
import Map from './Map/Map';

function Main() {
  return (
    <main className="main">
      <div className="d-flex main__container w-100">
        <Sidebar />
        <Map />
      </div>
    </main>
  )
}

export default Main;