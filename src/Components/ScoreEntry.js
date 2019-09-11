import React from 'react';
import './ScoreEntry.css';

class ScoreEntry extends React.Component {

    render() {

        return(
            <tr>
                <td>{this.props.rank}</td>
                <td>{this.props.name}</td>
                <td>{this.props.score}</td>
            </tr>                        
                                
        );
    }
}

export default ScoreEntry;