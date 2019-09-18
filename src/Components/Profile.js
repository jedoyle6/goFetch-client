import React from 'react';
import './Profile.css';
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
    let total_points = this.context.total_points;
    console.log(total_points)
    // if (!total_points) {
    //   total_points = 0;
    // }

    let ranking_text;
    if (this.context.rank < 1 || !this.context.rank) {
      ranking_text = "You are currently unranked. Play games and earn points on the leaderboard to gain rank!"
    } else {
      ranking_text = `You are currently ranked as player ${this.context.rank} out of ${this.context.totalPlayers}.`
    }

    return(
      <div className="profile-page">
        <h1 className="profile-text">{this.context.user_name}</h1>
        <img src={getAvatarByTeamId(this.context.team_id)} alt="Your player avatar" className="avatar"></img>
        <h2 className="profile-text">Total Points: {total_points}</h2>
        <h3 className="profile-text">{ranking_text}</h3>
      </div>
    );
  }
}

export default Profile;