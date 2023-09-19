import './Main.scss';
import Sidebar from "./Sidebar/Sidebar";
import Map from './Map/Map';
import { useFetchVehicle } from '../api/useFetchVehicle';

function Main() {
  const { data, erro, loading } = useFetchVehicle();

  return (
    <main className="main">
      <div className="d-flex main__container w-100">
        <Sidebar data={data} erro={erro} loading={loading} />
        <Map />
      </div>
    </main>
  )
}

export default Main;