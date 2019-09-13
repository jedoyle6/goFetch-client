import React from 'react';
import './Rules.css';
import GameContext from '../GameContext';

class Rules extends React.Component {
  static contextType = GameContext;

  render() {
    return(
      <div className="rules-page">
        <h1>Rules of Go Fish</h1>
        <p>
          Go Fish is a card game played between 2 players. 
          To begin, each player is dealt 7 cards from the deck. 
          Each turn consists of 3 main steps:
        </p>
        <h2>1) Asking your opponent for a card</h2>
        <p>
          Pick a card number from the ones you hold in your hand. 
          Then, ask your opponent if they have any cards of the given number. 
          For example: “Do you have any threes?”
        </p>
        <p>
          If that person has one or more of the called card, 
          all matching cards are given to you and become part of your hand. 
          Anytime you get cards from another player, you may repeat this process.
        </p>
        <h2>2) Go Fish</h2>
        <p>
          If your opponent does not have the card number you asked for, 
          they will say “Go Fish”. At this point, you draw a card from the deck.
        </p>
        <p>
          If the card you draw matches the card number you asked your opponent for, 
          show the card to your opponent, put it in your hand, and continue playing your turn.
        </p>
        <p>
          If the card does not match the card number you asked for, 
          the card becomes part of your hand, and it is your opponent’s turn.
        </p>
        <h2>3) Creating Sets of Four</h2>
        <p>
          As soon as you have a set of 4 cards of the same number in your hand (one of each suit), 
          you immediately remove those cards from your hand and score 1 point.
        </p>
        <h2>Winning the Game</h2>
        <p>
          The game ends when one person lays all their cards on the table, or the deck is empty, 
          whichever comes first. The person with the most points wins the game.
        </p>    
          
      </div>
    );
  }
}

export default Rules;