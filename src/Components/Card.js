import React from 'react';
import './CardImages.css';
import './Card.css';
import GameContext from '../GameContext';

class Card extends React.Component {
    static contextType = GameContext;

    render() {
        return(
            <button 
            className="card-button" 
            id={this.props.id} 
            onClick={() => this.context.handleCardRequest(this.props.id)}
            ></button>
        );
    }
}

export default Card;