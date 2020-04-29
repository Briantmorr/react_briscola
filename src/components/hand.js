import React from "react";
import Card from './card';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default function Hand(props) {
  
  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
  
    // change background colour if dragging
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  
  const getListStyle = isDraggingOver => ({
    display: "flex",
    padding: grid,
    overflow: "auto",
  });

  let cardImages = "";
  if(props.player_hand) {
    cardImages = props.player_hand.map((cardObject, index) => {
        const url = props.cardImages("./playing_cards/PNG-cards-1.3/" + cardObject.name);
        return(
          <Draggable key={String(cardObject.id)} draggableId={String(cardObject.id)} index={index}>
            {(provided, snapshot) => (
               <div
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               style={getItemStyle(
                 snapshot.isDragging,
                 provided.draggableProps.style
               )}
             >
                  <Card url={url} id={cardObject.id} />
              </div>
            )}
          </Draggable>
        );
    });
  }

  return (
    <div className="center">
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}

          className="player-hand"
        >
            {cardImages}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  );
}
