import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Users from './components/Users';
import Groups from './components/Groups'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

function App() {
  
  return (
    
    
    <Router>
    
    <div className="App">
      

      <Switch>

        <Route exact path="/" component={Users} />
        <Route exact path="/Departments" component={Groups} />
      
      </Switch>
    </div>
  </Router>

  );
}

export default App;
