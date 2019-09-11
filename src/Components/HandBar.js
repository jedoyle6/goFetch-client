import React from 'react';
import Card from './Card';
import './HandBar.css';
import GameContext from '../GameContext'

class HandBar extends React.Component {
    static contextType = GameContext;

    render() {
        const cards = this.context.playerHand.map(card => <Card id={card} key={card}/>)
        return(
            <div className="hand-bar">
                {cards}
            </div>
                          
        );
    }
}

export default HandBar;