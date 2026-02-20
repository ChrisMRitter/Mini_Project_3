import "./App.css";
import {Card} from "../components/Card";

function App(){

    return (
    <div className="App">
      <header className="App-header">
        <h1>Account Management</h1>
        <p>Manage your accounts below.</p>
        <div className = "Accounts">
            <Card />
            <Card />
            <Card />
        </div>
      </header>
    </div>
    );
};
export default App;
