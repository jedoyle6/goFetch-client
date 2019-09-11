import React from 'react';
import './HomeScreen.css';

class HomeScreen extends React.Component {

    render() {

        return(
            <div className="home-screen">
                <h1 className="homescreen-header">Go Fetch!</h1>
                <h2 className="homescreen-header">Where Dogs Play Go Fish</h2>

                <div className="homescreen-container">
                    <button className="homescreen-navbutton">Log In</button>                    
                    <button className="homescreen-navbutton">Leaderboard</button>
                    <button className="homescreen-navbutton">Play!</button>
                    
                </div>               
                
            </div>            
        );
    }
}

export default HomeScreen;