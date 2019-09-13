import React from 'react';
import './TextBar.css';
import GameContext from '../GameContext';

class TextBar extends React.Component {
    static contextType = GameContext;

    render() {
        return(
            <div className="text-bar">
                <p className="game-text">{this.context.message}</p>
            </div>
                          
        );
    }
}

export default TextBar;