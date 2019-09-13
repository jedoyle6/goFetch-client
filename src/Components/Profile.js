import React from 'react';
import './Profile.css';
import GameContext from '../GameContext';

class Profile extends React.Component {
  static contextType = GameContext;

  state = {
    playerName: 'Billy Bulldog',
    points: 30,
    rank: 12,
    totalPlayers: 20,
    team_id: 2
  }

  getAvatarByTeam =() => {
    const team = this.state.team_id
    switch (team) {
      case 1: return "./Images/Dogs/TerryTerrier_icon.png"
      case 2: return "./Images/Dogs/BillyBulldog_icon.png"
      case 3: return "./Images/Dogs/PenelopePoodle_icon.png"
      default: return "./Images/Dogs/BillyBulldog_icon.png"
    }     
  }

  render() {
    return(
      <div className="profile-page">
        <h1>{this.state.playerName}</h1>
        <img src={this.getAvatarByTeam()} alt="Your player avatar" className="avatar"></img>
        <h2>Points: {this.state.points}</h2>
        <h3>You are currently ranked {this.state.rank} out of {this.state.totalPlayers}.</h3>
        <button>Leaderboard</button>
        <button>Play!</button>
          
      </div>
    );
  }
}

export default Profile;