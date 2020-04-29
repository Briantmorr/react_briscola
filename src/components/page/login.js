import React from "react";
import { navigate } from "@reach/router";
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { API } from "../../service/api.js";

export class Login extends React.Component {
    // use Context/ provider to implement User name persistence.
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    //   password: '',
      errors: [],
      changed: false
    }
  }

  componentDidMount() {
    this.setState({
      errors: []
    });
  }
  
  handleLogin = () => {
    // handle logic for validating login for admin. 
    const {subdomain, email, password} = this.state;
    API.User.login({subdomain, email, password}).then(
      result => {
        if(result.error) {
          this.handleUnsuccessfulLogin(result.error);
        }
        else if (result.session_token){
          this.handleSuccessfulLogin(result);
        }
      },
      error => {
      }
    )
  }
  handleUnsuccessfulLogin(error) {
    let errorArr = this.state.errors;
    errorArr.push(error);
    this.setState({
      errors: errorArr 
    });
  }

  handleSuccessfulLogin(result) {
    navigate("/");
  }

  handleGuest = (e) => {
      e.preventDefault();
      // use entered name or get random
        if(this.state.name === '') {
            const name = API.Login.GuestName().then(
                res => {
                    console.log('res is', res);
                    // return res.name;
                    return res.data.name;
                }
            );
        }
        this.handleSuccessfulLogin();
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      changed: true
    })
  } 

  render() {
    let errorSegment = null
    if(this.state.errors) {
      errorSegment = this.state.errors.map((error, index) => {
        return (
          <Segment className='warning' key={index} >
          {error}
        </Segment>
        );
     });
    }

    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
          </Header>
          {errorSegment}
          <Form size="large" onSubmit={this.handleLogin}>
            <Segment>
              <Form.Input 
                fluid 
                icon="user" 
                iconPosition="left" 
                placeholder="Name " 
                name='name' 
                onChange={this.onChange} 
                value={this.state.name} 
              />
              <Form.Input 
                fluid 
                icon="lock" 
                iconPosition="left" 
                placeholder="Password" 
                type="password" 
                name='password'
                onChange={this.onChange} 
                value={this.state.password} 
              />
             <Button.Group fluid >
                <Button type='submit' name='submit' disabled={!this.state.changed} primary> Login </Button>
                <Button.Or />
                <Button name='guest' onClick={(e) => {this.handleGuest(e)}} > Play as Guest</Button>
              </Button.Group>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
