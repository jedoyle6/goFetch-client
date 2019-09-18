import React from 'react';
import './StatusBar.css';
import GameContext from '../GameContext';
import { getAvatarByTeamId, getAiName } from '../Helpers/helpers';

class StatusBar extends React.Component {
    static contextType = GameContext;


    render() {
        return(
            <div className="status-bar">

                <div className="player status">
                    <h2 className="status-header">You</h2>

                    
                    <div className="icon-container">
                        <img className="char-icon" src={getAvatarByTeamId(this.context.team_id)} alt="character portrait"></img>
                        <div className="status-container">
                            <div className="cards-in-hand status">
                                <img id="player-cards-in-hand" className="card-icon" src="./Images/CardBack.png" alt="cards in hand"></img>
                                <label htmlFor="player-cards-in-hand" className="icon-label">{this.context.playerHand.length}</label>
                            </div>

                            <div className="score status">
                                <img id="player-score" className="score-icon" src="./Images/GoldStar.png" alt="score"></img>
                                <label htmlFor="player-score" className="icon-label">{this.context.playerScore}</label>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="deck status">
                    <button id="deck" className="deck" onClick={() => this.context.forceEndGame()}></button>
                    <label htmlFor="deck" className="icon-label">{this.context.cardsInDeck}</label>
                </div>


                <div className="ai status">
                    <h2 className="status-header">{getAiName(this.context.ai_team)}</h2>

                    <div className="ai-icon-container">
                        <img className="char-icon" src={getAvatarByTeamId(this.context.ai_team)} alt="character portrait"></img>
                        <div className="ai-status-container">
                            <div className="cards-in-hand status">
                                <img id="ai-cards-in-hand" className="card-icon" src="./Images/CardBack.png" alt="cards in hand"></img>
                                <label htmlFor="ai-cards-in-hand" className="icon-label">{this.context.aiHand.length}</label>
                            </div>

                            <div className="score status">
                                <img id="ai-score" className="score-icon" src="./Images/GoldStar.png" alt="score"></img>
                                <label htmlFor="ai-score" className="icon-label">{this.context.aiScore}</label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>            
        );
    }
}

export default StatusBar;