import React from "react";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './card';
import { Image } from 'semantic-ui-react'

export class CardTable extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            activeCards: props.activeCards
        }
        const grid = 8;
    }

    getListStyle = isDraggingOver => ({
        display: "flex",
        padding: 20,
    });

    render() {
        return (
            <div className="center centerCardTable">
           
                    {this.state.activeCards.map((cardObject) => {
                        let className = "cardTableCards " + cardObject.status;
                        let cardSrc= cardObject.name;
                        let droppableId = "droppable_" + cardObject.id;
                        if(cardObject.status === "active")
                        {
                            cardSrc= this.props.cardImages("./playing_cards/PNG-cards-1.3/" + cardObject.name);
                        }

                        return(
                            <Droppable droppableId={droppableId} key={cardObject.id} direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                style={this.getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}

                                className="cardTable"
                                >
                                <div>
                                    <Image src={cardSrc} key={cardObject.id} size='small' className={className} />
                                </div>
                            </div>
                            )}
                        </Droppable>
                    )}
                )}
            </div>
        );
    } 
}


