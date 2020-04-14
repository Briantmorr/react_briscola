import React from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { API } from "../../service/api.js";

import PlayerTracker from '../playertracker';
import card_back from '../../temp_assets/card_back1.jpg'
import Board from "../board";
import Hand from "../hand"
import Deck from "../deck";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      phase: "deal" 
    };
  }

 componentDidMount() {
    API.Test.test().then(
        
      result => {
          console.log('result is');
        // this.setState({
        //   isLoaded: true,
        //   groups: result
        // });
      }
    //   error => {
    //     this.setState({
    //       isLoaded: true,
    //       error: error
    //     });

    //     errorHandler(error);
    //   }
    );
  }

  render() {
      let players = [
        {name:"bob", status:"active"}, 
        {name:"jim", status:"inactive"},
        {name:"matt", status:"inactive"},
        {name:"john", status:"inactive"},
        {name:"jenkins", status:"inactive"}
      ];    
      let boardContents = <Deck/>
   
    return (
      <React.Fragment>
        <Container>
          <Board boardContents={boardContents} />
          <PlayerTracker players={players} />
          <Hand/>
        </Container>
      </React.Fragment>
    );
  }
}
