import React from "react";
import { Segment, List, Image, Button } from "semantic-ui-react"
import card_back from '../temp_assets/card_back1.jpg'

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.images = require.context('../../public/assets', true);
  }
  
  render() {
    
    return (
        <div className="deck">
            <Image src={card_back} size='small' />
            <Button primary onClick={this.props.handleDeal}> Deal </Button>
        </div>
    );
  }
}

export default Deck;