import React from "react";
import { Image } from 'semantic-ui-react';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeImports:false,
      company:''
    }
  }



  render() {
  const card_name = "queen_of_spades.png";
  return (
    <div>
        <Image src={card_name} />
    </div>
  );
}d
}

export default Card;