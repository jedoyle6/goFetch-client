import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import TokenService from '../Helpers/TokenService';

class NavBar extends React.Component {


  handleLogoutClick = () => { 
    TokenService.clearAuthToken();
  }


  render() {
    
    return(
      <div className="navbar">

      
        <Link to='/' className="navbar-link">
          <div className="navbar-button">
            <i className="fas fa-home nav-icon"></i>
            <p className="nav-label">Home</p>
          </div>
        </Link>
      

      
        <Link to='/leaderboard' className="navbar-link">
          <div className="navbar-button">
            <i className="fas fa-trophy nav-icon"></i>
            <p className="nav-label">Leaderboard</p>
          </div>
        </Link>          
      

      
        <Link to='/game' className="navbar-link">
          <div className="navbar-button">
            <i className="fas fa-play-circle nav-icon"></i>
            <p className="nav-label">Play!</p>
          </div>
        </Link>          
     

      
        <Link to='/rules' className="navbar-link">
          <div className="navbar-button">
            <i className="fas fa-scroll nav-icon"></i>
            <p className="nav-label">Rules</p>
          </div>
        </Link>          
      
        

        <Link to='/profile' className="navbar-link">
          <div className="navbar-button">
            <i className="far fa-user nav-icon"></i>
            <p className="nav-label">Profile</p>
          </div>
        </Link>

        {TokenService.hasAuthToken() && 
        <Link to='/' onClick={this.handleLogoutClick} className="navbar-link nav-icon">
          <div className="navbar-button">
            <i className="fas fa-sign-out-alt nav-icon"></i>
            <p className="nav-label">Sign Out</p>
          </div>
        </Link>}

        {!TokenService.hasAuthToken() && 
        <Link to='/login' className="navbar-link">
          <div className="navbar-button">
            <i className="fas fa-sign-in-alt nav-icon"></i>
            <p className="nav-label">Sign In</p>
          </div>
        </Link>}

      </div>
    );
  }
}

export default NavBar;