import './styles/App.css';
import VehicleOdom from './components/VehicleOdom';
import AtakStatus from './components/AtakStatus';
import INSstatus from './components/INSstatus';
import NavSat from './components/NavSat';
import SystemStatus from './components/SystemStatus';

function App() {
  return (
    <div className="app">
      <div className="cards">
        <VehicleOdom/>
        <AtakStatus/>
        <NavSat/>
        <INSstatus/>
        <SystemStatus/>
      </div>
    </div>
  );
}

export default App;
