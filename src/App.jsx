import { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Tasks from './components/Tasks'
import Logging from "./components/Logging";
import Welcome from "./components/Welcome";
function App() {
  return (
    <div>
      <nav>
        <ul style={{ display: "flex", gap: "40px", listStyle: "none" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">tasks</Link>
          </li>
          <li>
            <Link to="/logging">logging</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/Tasks">
         <Tasks userId={"asdfasdf"} />
        </Route>
        <Route path="/logging">
          <Logging/>
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
