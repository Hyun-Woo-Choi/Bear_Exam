import logo from "./logo.svg";
import "./App.css";
import FleetTable from "./components/fleetTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Fleet</h1>
      </header>
      <FleetTable />
    </div>
  );
}

export default App;
