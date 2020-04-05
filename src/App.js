import React from 'react';
import './App.css';
import "semantic-ui-css/semantic.min.css";
import { Router } from "@reach/router";
import { Login } from "./components/page/login.js";
import { PrivateRoutes } from './helpers/privateRoutes';

function App() {
  return (
    <div className="App">
      <React.Fragment>
          <Router>
              <Login path="/login" />
              <PrivateRoutes path="/*"/>
          </Router> 
      </React.Fragment>    
    </div>
  );
}

export default App;
