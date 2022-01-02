import "./App.css";
import { Link, Switch, Route } from "react-router-dom";
import { CreateTournament } from "./tournament";
import { Dashboard } from "./Dashboard";
import { Tables } from "./table";

function App() {
  return (
    <div className="App">
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tournament">Tournament</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/tables">
          <Tables />
        </Route>
        <Route path="/tournament">
          <CreateTournament />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
