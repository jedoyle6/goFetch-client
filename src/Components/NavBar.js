import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import TokenService from '../Helpers/TokenService';

class NavBar extends React.Component {

  state = {error: null}


  render() {
    return(
      <div className="navbar">
        <Link to='/' className="navbar-link"><i className="fas fa-home"></i> Home</Link>
        <Link to='/leaderboard' className="navbar-link"><i className="fas fa-trophy"></i> Leaderboard</Link>
        <Link to='/game' className="navbar-link"><i className="fas fa-play-circle"></i> Play!</Link>
        <Link to='/rules' className="navbar-link"><i className="fas fa-scroll"></i> Rules</Link>
        {TokenService.hasAuthToken() && <Link to='/profile' className="navbar-link"><i className="far fa-user"></i>Profile</Link>}
        {TokenService.hasAuthToken() && <Link to='/' onClick={TokenService.clearAuthToken} className="navbar-link"><i className="fas fa-sign-out-alt"></i>Sign Out</Link>}
        {!TokenService.hasAuthToken() && <Link to='/login' className="navbar-link"><i className="fas fa-sign-in-alt"></i>Sign In</Link>}          
      </div>
    );
  }
}

export default NavBar;