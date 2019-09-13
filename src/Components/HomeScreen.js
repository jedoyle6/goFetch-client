import React from 'react';
import './HomeScreen.css';
import { Link } from 'react-router-dom';

class HomeScreen extends React.Component {

    render() {

        return(
            <div className="home-screen">
                <h1 className="homescreen-header">Go Fetch!</h1>
                <h2 className="homescreen-header">Where Dogs Play Go Fish</h2>

                <div className="homescreen-container">
                    <Link to='/login'><button className="homescreen-navbutton">Log In</button></Link>
                    <Link to='/leaderboard'><button className="homescreen-navbutton">Leaderboard</button></Link>
                    <Link to='/game'><button className="homescreen-navbutton">Play!</button></Link>
                    
                </div>               
                
            </div>            
        );
    }
}

export default HomeScreen;