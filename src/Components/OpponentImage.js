import React from 'react';
import './OpponentImage.css';
import GameContext from '../GameContext';
import { getPortraitByTeamId } from '../Helpers/helpers';

class OpponentImage extends React.Component {
    static contextType = GameContext;   

    render() {

        return(
            <div className="opponent-image">
                <img className="opponent-image" alt="your opponent" src={getPortraitByTeamId(this.context.ai_team)}></img>
            </div>            
        );
    }
}

export default OpponentImage;