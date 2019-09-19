import React from 'react';
import './Leaderboard.css';
import ScoreEntry from './ScoreEntry'
import ApiService from '../Helpers/ApiService';

class Leaderboard extends React.Component {
    state = {        
        playerScoreData: [],
        teamScoreData: [],
        show: 'player',
        playerPage: 1,
        teamPage: 1,
        showPerPage: 5
    }

    pagePrevious = () => {
        if (this.state.show === 'player' && this.state.playerPage > 1) {
            this.setState({playerPage: this.state.playerPage-1})
        }
        if (this.state.show === 'team' && this.state.teamPage > 1) {
            this.setState({teamPage: this.state.teamPage-1})
        }
    }

    pageNext = () => {
        const totalTeamPages = Math.ceil(this.state.teamScoreData.length/this.state.showPerPage);
        const totalPlayerPages = Math.ceil(this.state.playerScoreData.length/this.state.showPerPage);
        if (this.state.show === 'player' && this.state.playerPage < totalPlayerPages) {
            this.setState({playerPage: this.state.playerPage+1})
        }
        if (this.state.show === 'team' && this.state.teamPage < totalTeamPages) {
            this.setState({teamPage: this.state.teamPage+1})
        }
    }

    setShowPerPage = (event) => {        
        const newValue = parseInt(event.target.value);
        this.setState({
            playerPage: 1,
            teamPage: 1,
            showPerPage: newValue
        })
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
        const showPerPage = this.state.showPerPage;
        const teamPage = this.state.teamPage;
        const totalTeamPages = Math.ceil(this.state.teamScoreData.length/showPerPage);
        const playerPage = this.state.playerPage;
        const totalPlayerPages = Math.ceil(this.state.playerScoreData.length/showPerPage);
        const teamScores = this.state.teamScoreData
            .slice(showPerPage*(teamPage-1), showPerPage*teamPage)
            .map((teamData, index) => 
                <ScoreEntry 
                    key={index} 
                    rank={showPerPage*(teamPage-1)+index+1} 
                    name={teamData.team_name} 
                    score={teamData.sum}
                />
        )
        const playerScores = this.state.playerScoreData
            .slice(showPerPage*(playerPage-1), showPerPage*playerPage)
            .map((playerData, index) => 
                <ScoreEntry 
                    key={index} 
                    rank={showPerPage*(playerPage-1)+index+1} 
                    name={playerData.user_name} 
                    score={playerData.sum}
                />
        )

        return(
            <div className="leaderboard-screen">
                <div className="leaderboard">
                    <h1 className="leaderboard-header">Leaderboard</h1>
                    <button className="leaderboard-toggle" onClick={() => this.setState({show: 'team'})}>Team</button>
                    <button className="leaderboard-toggle" onClick={this.updateLeaderboard}><i className="fas fa-sync-alt"></i></button>
                    <button className="leaderboard-toggle" onClick={() => this.setState({show: 'player'})}>Player</button>
                    
                    <div className="leaderboard-container">
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
                    </div>
                    
                    <button className="leaderboard-nav" onClick={this.pagePrevious}><i className="fas fa-angle-left button-icon"></i> Prev</button>
                    <span className="leaderboard-text">-  Page {this.state.show === 'player' ? playerPage : teamPage} of {this.state.show === 'player' ? totalPlayerPages : totalTeamPages}  -</span>
                    <button className="leaderboard-nav" onClick={this.pageNext}>Next <i className="fas fa-angle-right button-icon"></i></button>
                    
                    <p className="leaderboard-text">Show Per Page:</p>
                    <button className="leaderboard-num-toggle" value="5" onClick={e => this.setShowPerPage(e)}>5</button>
                    <button className="leaderboard-num-toggle" value="10" onClick={e => this.setShowPerPage(e)}>10</button>
                    <button className="leaderboard-num-toggle" value="15" onClick={e => this.setShowPerPage(e)}>15</button>
                    <button className="leaderboard-num-toggle" value="20" onClick={e => this.setShowPerPage(e)}>20</button>
                </div>

            </div>            
        );
    }
}

export default Leaderboard;