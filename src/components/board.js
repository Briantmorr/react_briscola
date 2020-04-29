import React from "react";
import { Image, Button } from 'semantic-ui-react';

function Board(props) {
  return (
    <div>
      {props.boardContents}
    </div>
  );
}

export default Board;