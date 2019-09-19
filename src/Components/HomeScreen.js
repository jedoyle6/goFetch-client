import React from 'react';
import './HomeScreen.css';
import GameContext from '../GameContext';

class HomeScreen extends React.Component {
    static contextType = GameContext;

    render() {

        return(
            <div className="home-screen">
                <img src="./Images/BackgroundImageWithDogs.png" className="background" alt="background of dogs playing cards"></img>
                <h1 className="homescreen-header">Go Fetch!</h1>
                <h2 className="homescreen-header">Where Dogs Play Go Fish</h2>

                <div className="homescreen-container" hidden={!this.context.showIntro}>
                    <p className="homescreen-text">Welcome to Go Fetch, where you can play Go Fish against an AI for points on our leaderboard!</p>
                    <p className="homescreen-text">If you're interested in playing for rank, sign in or create a new profile with the <i className="fas fa-sign-in-alt"></i> Sign In button on the top navigation bar.</p>
                    <p className="homescreen-text">If you'd rather just play a casual game, feel free to get started with the <i className="fas fa-play-circle"></i> Play button up top.</p>
                    <p className="homescreen-text">If you need a refresher on how to play, take a look at the <i className="fas fa-scroll"></i> Rules section.</p>
                    <p className="homescreen-text">And if you want to check your ranking (or the ranking of your team), check out the <i className="fas fa-trophy"></i> Leaderboard.</p>
                    <p className="homescreen-text">Have Fun!</p>
                    <button className="homescreen-text-dismiss" onClick={this.context.hideIntro}>Dismiss</button>
                    
                </div>               
                
            </div>            
        );
    }
}

export default HomeScreen;