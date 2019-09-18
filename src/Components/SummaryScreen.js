import React from 'react';
import './SummaryScreen.css';
import GameContext from '../GameContext';
import { Link } from 'react-router-dom';
import { getAvatarByTeamId, getAiName } from '../Helpers/helpers';


class SummaryScreen extends React.Component {
    static contextType = GameContext;

    render() {
        const playerScore = this.context.playerScore;
        const aiScore = this.context.aiScore;
        // let headerText;
        // let bottomText;
        // if (playerScore > aiScore) {
        //     headerText = 'You Win!'
        //     bottomText = `You earn ${playerScore} points!`
        // } else if (aiScore > playerScore) {
        //     headerText = 'The AI Wins!'
        //     bottomText = 'Better luck next time!'
        // } else {
        //     headerText = 'It\'s a Draw!'
        //     bottomText = 'What a close match!'
        // }

        return(
            <div className="summary-screen">
                <h1 className="summary-header">Game Over!</h1>
                <h2 className="summary-header">{this.context.summary_header}</h2>
                <div className="summary-container">
                    <div className="player summary">
                        <h2 className="summary-header">You</h2>

                        <div className="player-summary-icons">
                            <img className="char-icon" src={getAvatarByTeamId(this.context.team_id)} alt="character portrait"></img>

                            <div className="score status">
                                <img id="player-score" className="score-icon" src="./Images/GoldStar.png" alt="score"></img>
                                <label htmlFor="player-score" className="icon-label">{playerScore}</label>
                            </div>
                        </div>     
                    </div>

                    <div className="opponent summary">
                        <h2 className="summary-header">{getAiName(this.context.ai_team)}</h2>

                        <div className="ai-summary-icons">
                            <img className="char-icon" src={getAvatarByTeamId(this.context.ai_team)} alt="character portrait"></img>

                            <div className="score status">
                                <img id="player-score" className="score-icon" src="./Images/GoldStar.png" alt="score"></img>
                                <label htmlFor="player-score" className="icon-label">{aiScore}</label>
                            </div>
                        </div>
                    </div>

                </div>
                <p className="footer-text">{this.context.summary_footer}</p>
                <div className="summary-container">
                    <Link to='/game'><button className="navButton" onClick={this.context.restartGame}>Play Again?</button></Link>
                    <Link to='/leaderboard'><button className="navButton">Leaderboard</button></Link>
                </div>
                

                
            </div>            
        );
    }
}

export default SummaryScreen;