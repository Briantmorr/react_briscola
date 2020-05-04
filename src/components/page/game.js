import React from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { API } from "../../service/api.js";

import PlayerTracker from '../playertracker';
import card_back from '../../temp_assets/card_back1.jpg'
import Board from "../board";
import Hand from "../hand"
import Deck from "../deck";
import Bid from "../bid";
import { CardTable } from "../cardTable";
import { DragDropContext } from "react-beautiful-dnd";

export const ItemTypes = {
  CARD: 'card',
}

const cardImages = require.context('../../../public/assets', true);
export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      deck: [],
      hands: [],
      activeCards: this.getPlaceholders(5),
      phase: "deal",
      currentBid: 0,
      playerBid: 80,
    };

  }

 componentDidMount() {
    this.composeDeck();
  }

  composeDeck = () => {
    const suites = ["hearts", "diamonds", "clubs", "spades"];
    const number = ['2', '3', '4', '5', '6', '7',  'jack', 'queen', 'king', 'ace'];
    let deck = [];
    let counter = 0
    suites.forEach(suite => {
        number.forEach(number => {
            const composed_name = number + "_of_" + suite + ".png";
            let cardObject = {
              "id": counter,
              "name": composed_name
            }
            deck.push(cardObject)
            counter++;
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

  handleDeal = () => {
    const handCardCount = 8
    const playerCount = 5;
    let hands = [];

    while(playerCount > hands.length) {
        let singleHand = this.getHand(handCardCount);
        hands.push(singleHand);
    }

    this.setState({
      hands: hands,
      phase: "bid"
    });
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

  handlePlayerBidChange = (playerBid) => {
    // if bid is maxed or sometihg, just end timer
    this.setState({playerBid})
  }
  handlePlayerBid = () => {
    // calculate new default player bid
    // this requires webhooks to properly work, and this is just a Proof of Concept 

    this.setState({currentBid: this.state.playerBid}, () => {
      let currentPlayerBid = this.state.playerBid;
      if (currentPlayerBid <= this.state.currentBid && this.state.currentBid !== 120) {
        currentPlayerBid = parseInt(this.state.currentBid) + 1;
      }
      this.setState({playerBid:currentPlayerBid})
    })
  }
  handleBidComplete = () => {
    console.log('bidding phase is over');
    this.setState({phase:'play'})
  }

  move = (source, activeCards, droppableSource, droppableDestination) => {
    const sourceClone = source;
    const activeCardsClone = activeCards;
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    removed.status = 'active';
    activeCardsClone.splice(this.getCurrentActiveCardIndex(), 1, removed);
    
    const result = {};
    const handsClone = this.state.hands;
    handsClone[1] = sourceClone;
    result["hand"] = handsClone;
    result["activeCards"] = activeCardsClone;
    return result;
  };

  getCurrentActiveCardIndex = () => {
    return this.state.activeCards.findIndex((x) => 
      x.status === 'inactive'
    )
  }

  reorder = (hand, startIndex, endIndex) => {
    const result = hand;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if (source.droppableId === "droppable" && destination.droppableId === "droppable" ) {
        const hand = this.reorder(
            this.state.hands[1],
            source.index,
            destination.index
        );

        let updatedHand = this.state.hands;
        updatedHand[1] = hand;
        this.setState({ hands: updatedHand});

        // if (source.droppableId === 'droppable2') {
        //     state = { selected: items };
        // }
      }
    else {
        const result = this.move(
            this.state.hands[1],
            this.state.activeCards,
            source,
            destination
        );

        this.setState({
            hands: result.hand,
            activeCards: result.activeCards
        });
    }
  };

  getPlaceholders= count =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `placeholder-${k}`,
            name: card_back,
            status: "inactive"
        })
    );

  render() {
      let players = [
        {id:1, name:"bob", status:"active"}, 
        {id: 2, name:"jim", status:"inactive"},
        {id: 3, name:"matt", status:"inactive"},
        {id: 4, name:"john", status:"inactive"},
        {id: 5, name:"jenkins", status:"inactive"}
      ];    
      let boardContents = "";
      if(this.state.phase === 'deal') {
        boardContents = <Deck deck={this.state.deck} handleDeal={this.handleDeal}/>
      }
   
      if(this.state.phase === 'bid') {
        boardContents = <Bid 
                          handlePlayerBid={this.handlePlayerBid} 
                          handlePlayerBidChange={this.handlePlayerBidChange} 
                          playerBid={this.state.playerBid} 
                          currentBid={this.state.currentBid} 
                          handleBidComplete={this.handleBidComplete}
                        />;
      }

      if(this.state.phase === 'play') {
        boardContents = <CardTable cardImages={cardImages} activeCards={this.state.activeCards}/>
      }


    return (
        <React.Fragment>
          <Container>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Board boardContents={boardContents} />
              <PlayerTracker players={players} />
              {this.state.phase === 'deal' ? '' : <Hand cardImages={cardImages} player_hand={this.state.hands[1]} />}
            </DragDropContext>
          </Container>
        </React.Fragment>
    );
  }
}
