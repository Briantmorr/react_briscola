import React from "react";
import { Image } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';

export default function Card(props){
    
  return (
    <Image src={props.url} size='tiny' />
  );
}