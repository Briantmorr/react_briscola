import React from 'react';
import { Router, navigate} from "@reach/router";
import { Grid } from "semantic-ui-react";
import AppNav from "../components/app-nav.js";
import { Game } from "../components/page/game.js";
import { Login } from '../components/page/login.js'


export class PrivateRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_token:null,
      logged_in:false,
      completedImport: false
    }
  }

  componentDidMount() {
    this.verifyLogin();
  }

  componentWillUpdate() {
    if(!this.state.session_token) {
      this.verifyLogin();
    }
  }

  verifyLogin() {
    const session_token =  "temp";// Cookie.get('session_token');
    if(session_token) {
      this.setState({session_token})
    this.handleLogin();
    }
  }

  updateImportState() {
    if(!this.state.completedImport) {
      this.setState({
        completedImport:true
      });
    }
  } 

  handleLogin = () => {
    this.toggleLogin(true); 
  }

  handleLogout = () => {
    this.toggleLogin(false);
    // Cookie.remove('session_token');
    navigate('/login');
  }

  toggleLogin(value) {
    this.setState({
      logged_in: value
    });
  }


  render() {
    if(!this.state.session_token) {
      return <Login/>
    }
    return (
      <React.Fragment>
        <AppNav completedImport={this.state.completedImport} handleLogin={this.handleLogin} handleLogout={this.handleLogout} logged_in={this.state.logged_in} />
        <div id="game-body">

        <Grid centered columns={3}>
          <Grid.Column width={12}>
            <Router>
              <Game path="/" name="game" />
            </Router>
         </Grid.Column>
        </Grid>
        </div>
      </React.Fragment>
    )
  }
}