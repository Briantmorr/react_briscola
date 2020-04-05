import React from "react";
import { Container, Image } from "semantic-ui-react";
import { API } from "../../service/api.js";

import card_back from '../../temp_assets/card_back1.jpg'
import Board from "../board.js";
import Hand from "../hand.js"

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      groups: []
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
    
    return (
      <React.Fragment>
        <Container>

          <Image src={card_back} size='small' />
          <Board/>
          <Hand/>
        </Container>
      </React.Fragment>
    );
  }
}
