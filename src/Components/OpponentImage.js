import React from 'react';
import './OpponentImage.css';

class OpponentImage extends React.Component {

    render() {

        return(
            <div className="opponent-image">
                <img className="opponent-image" alt="your opponent" src="./Images/BackgroundImage.png"></img>
            </div>            
        );
    }
}

export default OpponentImage;