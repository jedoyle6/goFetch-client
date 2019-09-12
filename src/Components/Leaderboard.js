import React from 'react';
import './Leaderboard.css';
import { TEAM_LB_DATA, PLAYER_LB_DATA } from '../DUMMY-LB-DATA';
import ScoreEntry from './ScoreEntry'
import { Link } from 'react-router-dom';

class Leaderboard extends React.Component {
    state = {
        teamScoreData: TEAM_LB_DATA,
        playerScoreData: PLAYER_LB_DATA,
        show: 'player'
    }

    render() {
        const teamScores = this.state.teamScoreData.map((teamData, index) => <ScoreEntry key={index} rank={index+1} name={teamData.name} score={teamData.score}/>)
        const playerScores = this.state.playerScoreData.map((teamData, index) => <ScoreEntry key={index} rank={index+1} name={teamData.name} score={teamData.score}/>)

        return(
            <div className="leaderboard-screen">
                <div className="leaderboard">
                    <h1 className="leaderboard-header">Leaderboard</h1>
                    <button className="leaderboard-toggle" onClick={() => this.setState({show: 'team'})}>Team</button>
                    <button className="leaderboard-toggle" onClick={() => this.setState({show: 'player'})}>Player</button>
                    <div className="leaderboard-container">
                        <button className="leaderboard-nav"><i className="fas fa-angle-left"></i></button>
                        <table className="leaderboard-table">
                            <thead>
                                <tr>
                                    <th className="leaderboard-header">Rank</th>
                                    <th className="leaderboard-header">Name</th>
                                    <th className="leaderboard-header">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.show === 'player' ? playerScores : teamScores}
                            </tbody>
                        </table>
                        <button className="leaderboard-nav"><i className="fas fa-angle-right"></i></button>
                    </div>
                </div>
                <div>
                    <Link to='/game'><button className="leaderboard-startgame">Play!</button></Link>
                </div>                
            </div>            
        );
    }
}

export default Leaderboard;