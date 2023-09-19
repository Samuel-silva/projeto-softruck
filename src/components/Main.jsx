import './Main.scss';
import Sidebar from "./Sidebar/Sidebar";

function Main() {
  return (
    <main className="main">
      <Sidebar />

      <div className="map"></div>
    </main>
  )
}

export default Main;