import React from "react";
import { Menu } from "semantic-ui-react";
import { navigate } from "@reach/router";
// import { API } from "../service/api.js";
// import UserContext from '../userContext.js';

class AppNav extends React.Component {
//   static contextType = UserContext

  constructor(props) {
    super(props);

    this.state = {
      activeImports:false,
    }
  }

  handleLogin = () => {
    if(this.props.logged_in) {
      this.props.handleLogout();
    }
    else {
      navigate('/login');
    }
  }

//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       activeImports: nextProps.completedImport
//     });
//   }

  render() {

    return (
      <Menu pointing secondary>
        <Menu.Item header>Briscola Chiamata</Menu.Item>
        <Menu.Item
          onClick={() => {
            // navigate("/");
            alert("Game Started")
          }}
        >
          Start Game 
        </Menu.Item>
        <Menu.Item
          onClick={() => {
              alert("Reset!");
          }}
        >
          Reset 
        </Menu.Item>

        <Menu.Item
          onClick={() => {
              alert("Reset!");
          }}
        >
            Stats
        </Menu.Item>

        <Menu.Item
          name="login"
          position="right"
          onClick={this.handleLogin}
        >
          {this.props.logged_in ? 'logout' : 'login'}  
        </Menu.Item>
      </Menu>
    );
  }
}

export default AppNav;