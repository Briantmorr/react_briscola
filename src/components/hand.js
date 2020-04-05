import React from "react";
import { Segment, List, Image } from "semantic-ui-react"

class Hand extends React.Component {
  constructor(props) {
    super(props);
    this.cardNames = [];
    this.state = {
      cards:[
          ""
      ],
      company:''
    }
    this.images = require.context('../../public/assets', true);
  }

  seedCardNames = () => {
    const suites = ["hearts", "diamonds", "clubs", "spades"];
    const number = ['2', '3', '4', '5', '6', '7', '8', 'jack', 'queen', 'king', 'ace'];
    suites.forEach(suite => {
        number.forEach(number => {
            const composed_name = number + "_of_" + suite + ".png";
            this.cardNames.push(composed_name)
        })
    });
    console.log(this.cardNames);
  }

  // super dump first implementation
  getHand = (handSize) => {
    console.log(Math.random());
    let handArray = [];
    for(let i = 0; i < handSize; i++) {
        let random = Math.floor(Math.random() * 40);
        handArray.push(this.cardNames[random]);
    }

    return handArray;
  }
  



  render() {
      this.seedCardNames();
    let handNames = this.getHand(8);
    console.log('hand array is ', handNames );
    let cardImages = handNames.map(card_name => {

        console.log('card name is ', card_name);
        const url = this.images("./playing_cards/PNG-cards-1.3/" + card_name);

        return(
            <List.Item className="card-list">
                <Image src={url} size='tiny' />
            </List.Item>
        );
    })
    return (
        <Segment inverted className="player-hand">
            <List horizontal>
                {cardImages}
            </List>
        </Segment>
    );
  }
}

export default Hand;