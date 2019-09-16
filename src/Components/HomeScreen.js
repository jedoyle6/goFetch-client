import React from 'react';
import './HomeScreen.css';
import { Link } from 'react-router-dom';
import TokenService from '../Helpers/TokenService';

class HomeScreen extends React.Component {

    render() {

        return(
            <div className="home-screen">
                <h1 className="homescreen-header">Go Fetch!</h1>
                <h2 className="homescreen-header">Where Dogs Play Go Fish</h2>

                <div className="homescreen-container">
                    {!TokenService.hasAuthToken() && <Link to='/login'><button className="homescreen-navbutton">Log In</button></Link>}
                    {TokenService.hasAuthToken() && <Link to='/profile'><button className="homescreen-navbutton">Profile</button></Link>}
                    <Link to='/leaderboard'><button className="homescreen-navbutton">Leaderboard</button></Link>
                    {!TokenService.hasAuthToken() && <Link to='/game'><button className="homescreen-navbutton">Quick Play!</button></Link>}
                    {TokenService.hasAuthToken() && <Link to='/game'><button className="homescreen-navbutton">Play!</button></Link>}
                    
                </div>               
                
            </div>            
        );
    }
}

export default HomeScreen;