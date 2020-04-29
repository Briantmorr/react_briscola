import React from 'react';
import { List, Segment } from 'semantic-ui-react';

export default function PlayerTracker(props) {
    // handle players
    let playerContent = props.players.map((player) => {
        const color = player.status == 'active' ? "red" : "grey";
        const size = 'big'; 
        return(
            <List.Item key={player.id}>
                <List.Icon name='user circle' color={color} size={size} verticalAlign='middle' />
                {player.name}
            </List.Item>
        )
    });

    return(
        <Segment inverted className="player-tracker">
            <List inverted divided horizontal size='big'>
                {playerContent}
            </List>
        </Segment>
    );
}