import React from 'react';
import './Rules.css';
import { Link } from 'react-router-dom';
import GameContext from '../GameContext';

class Rules extends React.Component {
  static contextType = GameContext;

  render() {
    return(
      <div className="rules-page">
        <h1 className="rules-text">Rules of Go Fish</h1>
        <p className="rules-text">
          Go Fish is a card game played between 2 players. 
          To begin, each player is dealt 7 cards from the deck. 
          Each turn consists of 3 main steps:
        </p>
        <h2 className="rules-text">1) Asking your opponent for a card</h2>
        <p className="rules-text">
          Pick a card number from the ones you hold in your hand. 
          Then, ask your opponent if they have any cards of the given number. 
          For example: “Do you have any threes?”
        </p>
        <p className="rules-text">
          If that person has one or more of the called card, 
          all matching cards are given to you and become part of your hand. 
          Anytime you get cards from another player, you may repeat this process.
        </p>
        <h2 className="rules-text">2) Go Fish</h2>
        <p className="rules-text">
          If your opponent does not have the card number you asked for, 
          they will say “Go Fish”. At this point, you draw a card from the deck.
        </p>
        <p className="rules-text">
          If the card you draw matches the card number you asked your opponent for, 
          show the card to your opponent, put it in your hand, and continue playing your turn.
        </p>
        <p className="rules-text">
          If the card does not match the card number you asked for, 
          the card becomes part of your hand, and it is your opponent’s turn.
        </p>
        <h2 className="rules-text">3) Creating Sets of Four</h2>
        <p className="rules-text">
          As soon as you have a set of 4 cards of the same number in your hand (one of each suit), 
          you immediately remove those cards from your hand and score 1 point.
        </p>
        <h2 className="rules-text">Winning the Game</h2>
        <p className="rules-text">
          The game ends when one person lays all their cards on the table, or the deck is empty, 
          whichever comes first. The person with the most points wins the game.
        </p>

        <a href="#top">
          <button className="rules-navbutton">
            <i className="fas fa-chevron-circle-up"></i><br/>
            <span className="return-button-text">Back to Top</span>
          </button>
        </a>
      </div>
    );
  }
}

export default Rules;