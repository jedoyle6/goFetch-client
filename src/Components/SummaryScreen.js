import React from 'react';
import './SummaryScreen.css';
import GameContext from '../GameContext';

class SummaryScreen extends React.Component {
    static contextType = GameContext;

    render() {
        const playerScore = this.context.playerScore;
        const aiScore = this.context.aiScore;
        let headerText;
        let bottomText;
        if (playerScore > aiScore) {
            headerText = 'You Win!'
            bottomText = `You earn ${playerScore+10} points!`
        } else if (aiScore > playerScore) {
            headerText = 'The AI Wins!'
            bottomText = 'Better luck next time!'
        } else {
            headerText = 'It\'s a Draw!'
            bottomText = 'What a close match!'
        }

        return(
            <div className="summary-screen">
                <h1 className="summary-header">Game Over!</h1>
                <h2 className="summary-header">{headerText}</h2>
                <div className="summary-container">
                    <div className="player summary">
                        <h2 className="summary-header">You</h2>

                        <img className="char-icon" src="./Images/Dogs/BillyBulldog_icon.png" alt="character portrait"></img>

                        <div className="score status">
                            <img id="player-score" className="score-icon" src="./Images/GoldStar.png" alt="score"></img>
                            <label htmlFor="player-score" className="icon-label">{playerScore}</label>
                        </div>                    
                    </div>

                    <div className="opponent summary">
                        <h2 className="summary-header">Opponent</h2>                        

                        <div className="score status">
                            <img id="player-score" className="score-icon" src="./Images/GoldStar.png" alt="score"></img>
                            <label htmlFor="player-score" className="icon-label">{aiScore}</label>
                        </div>

                        <img className="char-icon" src="./Images/Dogs/BillyBulldog_icon.png" alt="character portrait"></img>                    
                    </div>

                </div>
                <p className="footer-text">{bottomText}</p>
                <div className="summary-container">
                    <button className="navButton">Play Again?</button>
                    <button className="navButton">Leaderboard</button>
                </div>
                

                
            </div>            
        );
    }
}

export default SummaryScreen;