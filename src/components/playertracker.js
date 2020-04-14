import React from 'react';
import { List, Segment } from 'semantic-ui-react';

export default function PlayerTracker(props) {
    // handle players
    let playerContent = props.players.map((player, index) => {
        console.log('p is', player.name);
        const color = player.status == 'active' ? "red" : "";
        const size = 'big'; //player.status == 'active' ? "huge" : "big";
        return(
            <List.Item >
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