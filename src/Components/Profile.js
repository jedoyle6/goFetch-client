import React from 'react';
import './Profile.css';
import GameContext from '../GameContext';
import ApiService from '../Helpers/ApiService';
import TokenService from '../Helpers/TokenService';

class Profile extends React.Component {
  static contextType = GameContext;

  state = {error: null}

  // state = {
  //   playerName: 'Billy Bulldog',
  //   points: 30,
  //   rank: 12,
  //   totalPlayers: 20,
  //   team_id: 2
  // }

  getAvatarByTeam =() => {
    const team = this.context.team_id
    switch (team) {
      case 1: return "./Images/Dogs/TerryTerrier_icon.png"
      case 2: return "./Images/Dogs/BillyBulldog_icon.png"
      case 3: return "./Images/Dogs/PenelopePoodle_icon.png"
      default: return "./Images/Dogs/BillyBulldog_icon.png"
    }     
  }

  componentDidMount () {
    if (TokenService.hasAuthToken()) {
      ApiService.getProfileData()
      .then(profileData => {
        const {user_name, total_points, team_id, rank, totalPlayers} = profileData;
        return this.context.asyncSetState({
            user_name,
            total_points,
            team_id,
            rank,
            totalPlayers
        });
    })
    .catch(res => {
        this.setState({ error: res.error })
    })
    }
  }

  render() {
    return(
      <div className="profile-page">
        <h1>{this.context.user_name}</h1>
        <img src={this.getAvatarByTeam()} alt="Your player avatar" className="avatar"></img>
        <h2>Total Points: {this.context.total_points}</h2>
        <h3>You are currently ranked {this.context.rank} out of {this.context.totalPlayers}.</h3>
        <button>Leaderboard</button>
        <button>Play!</button>
          
      </div>
    );
  }
}

export default Profile;