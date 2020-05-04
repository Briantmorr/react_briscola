import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react"
import NumberInput from 'semantic-ui-react-numberinput';

export default function Bid(props) {   
    let [timer, setTimer] = useState(5);
    useEffect(() => {
        if(timer > 0) {
            setTimeout(() => {
                    // phase update 
            setTimer(--timer); 

            }, 1000);
        }
    });

    const handleContinue = () => {
        setTimer(60);
    }
    const bidButton = 
        timer > 0 ?
                <Button style={{"width":"100%"}} onClick={props.handlePlayerBid} primary>Bid</Button>
                :
                <div>
                    <Button style={{"width":"30%", "margin":"unset"}} primary onClick={props.handleBidComplete}>Start</Button>
                    <Button style={{"width":"70%", "margin":"unset"}} onClick={handleContinue}>Continue Bidding</Button>
                </div>
    ;
    return (
        <div className="cardTable centerCardTable bidTable">
            <div className="current-bid">
                Current Bid: 
                {props.currentBid}
                <div className="time-remaining">
                    {timer}
                </div>

            </div>

            <div className="player-bid">
                <NumberInput primary allowEmptyValue={true} doubleClickStepAmount={10} minValue={0} maxValue={120} value={String(props.playerBid)} onChange={props.handlePlayerBidChange}/>
                {bidButton}
            </div>
        </div>
    );
}
