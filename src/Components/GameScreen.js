import React from 'react';
import StatusBar from './StatusBar';
import TextBar from './TextBar';
import HandBar from './HandBar';
import OpponentImage from './OpponentImage';
import './GameScreen.css';

class GameScreen extends React.Component {

    render() {

        return(
            <div className="game-screen">
                <StatusBar/>
                <OpponentImage/>
                <TextBar />
                <HandBar />
            </div>            
        );
    }
}

export default GameScreen;