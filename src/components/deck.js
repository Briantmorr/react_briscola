import React from "react";
import { Segment, List, Image, Button } from "semantic-ui-react"
import card_back from '../temp_assets/card_back1.jpg'

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.cardNames = [];
    this.state = {
      deck: []
    }
    this.images = require.context('../../public/assets', true);
  }

  componentDidMount() {
      this.composeDeck();
  }

  composeDeck = () => {
    const suites = ["hearts", "diamonds", "clubs", "spades"];
    const number = ['2', '3', '4', '5', '6', '7', 'jack', 'queen', 'king', 'ace'];
    let deck = [];
    suites.forEach(suite => {
        number.forEach(number => {
            const composed_name = number + "_of_" + suite + ".png";
            deck.push(composed_name)
        })
    });

    const shuffledDeck = this.shuffle(deck); 
    this.setState({deck: shuffledDeck})
  }

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  getHand = (handCardCount) => {
      let hand = [];
      let counter = 0
      while(hand.length < handCardCount && counter < 10) {
          hand.push(this.state.deck.pop());

          counter++;
          if(counter > 9)
            console.log(counter)
      }
      return hand;
  }
    
  handleDeal = () => {
    const handCardCount = 8
    const playerCount = 5;
    let hands = [];

    while(playerCount > hands.length) {
        let singleHand = this.getHand(handCardCount);
        hands.push(singleHand);
    }

    console.log('hand is', hands);
  }



  render() {
    
    return (
        <div className="deck">
            <Image src={card_back} size='small' />
            <Button primary onClick={this.handleDeal}> Deal </Button>
        </div>
    );
  }
}

export default Deck;