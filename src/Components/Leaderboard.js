import React from 'react';
import './Leaderboard.css';
import ScoreEntry from './ScoreEntry'
import { Link } from 'react-router-dom';
import ApiService from '../Helpers/ApiService';

class Leaderboard extends React.Component {
    state = {        
        playerScoreData: [],
        teamScoreData: [],
        show: 'player'
    }

    updateLeaderboard = () => {
        Promise.all([ApiService.getPlayerLeaderboard(), ApiService.getTeamLeaderboard()]).then(values => {
            const playerScoreData = values[0];
            const teamScoreData = values[1];
            this.setState({playerScoreData, teamScoreData})
        })
    }

    componentDidMount() {
        this.updateLeaderboard()
    }

    render() {
        const teamScores = this.state.teamScoreData.map((teamData, index) => <ScoreEntry key={index} rank={index+1} name={teamData.team_name} score={teamData.sum}/>)
        const playerScores = this.state.playerScoreData.map((playerData, index) => <ScoreEntry key={index} rank={index+1} name={playerData.user_name} score={playerData.sum}/>)

        return(
            <div className="leaderboard-screen">
                <div className="leaderboard">
                    <h1 className="leaderboard-header">Leaderboard</h1>
                    <button className="leaderboard-toggle" onClick={() => this.setState({show: 'team'})}>Team</button>
                    <button className="leaderboard-toggle" onClick={this.updateLeaderboard}>Refresh</button>
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

            </div>            
        );
    }
}

export default Leaderboard;