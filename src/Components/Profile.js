import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import GameContext from '../GameContext';
import ApiService from '../Helpers/ApiService';
import TokenService from '../Helpers/TokenService';
import { getAvatarByTeamId } from '../Helpers/helpers';

class Profile extends React.Component {
  static contextType = GameContext;

  state = {error: null}

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
        <h1 className="profile-text">{this.context.user_name}</h1>
        <img src={getAvatarByTeamId(this.context.team_id)} alt="Your player avatar" className="avatar"></img>
        <h2 className="profile-text">Total Points: {this.context.total_points}</h2>
        <h3 className="profile-text">You are currently ranked {this.context.rank} out of {this.context.totalPlayers}.</h3>
      </div>
    );
  }
}

export default Profile;