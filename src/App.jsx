import { Switch, Route, Link } from "react-router-dom";
import Tasks from './components/Tasks'
import Logging from "./components/Logging";
import Welcome from "./components/Welcome";
import './App.css'
import {Box} from "@mui/material"
function App() {

  const ulStyle = { display: "flex", gap: "40px", listStyle: "none" }

  const navStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "black",
    padding: "1.5rem",
    margin: "0px",  
  }

  const navLinkStyle = {
    padding: "0.5rem",
    borderRadius: "15px",
  }




  return (
    <Box className="app">
      <Box sx={navStyle}>
        <Link style={navLinkStyle} className="navLink" to="/">Home</Link>
        <Link style={navLinkStyle} className="navLink" to="/tasks">tasks</Link>
        <Link style={navLinkStyle} className="navLink" to="/logging">logging</Link>
        {/* <ul style={ulStyle}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">tasks</Link>
          </li>
          <li>
            <Link to="/logging">logging</Link>
          </li>
        </ul> */}
      </Box>
      <Switch>
        <Route path="/Tasks">
         <Tasks />
        </Route>
        <Route path="/logging">
          <Logging/>
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
