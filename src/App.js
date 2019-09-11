import React from 'react';
import './App.css';
import GameScreen from './Components/GameScreen'
import { DECK, shuffle, sortByValue, handContainsCard, handContainsMatch, cardCodeToRequest } from './Helpers/helpers'
import GameContext from './GameContext';

class App extends React.Component {
  state = {
    player: {
      hand: [],
      score: 0
    },
    ai: {
      hand: [],
      score: 0
    },
    activePlayer: 'player',
    inactivePlayer: 'ai',
    deck: shuffle([...DECK]),
    message: 'Your opponent is thinking...'
  }

  startGame = () => {
    this.shuffleDeck();
    this.drawStartingHands();
  }

  drawCard = async (playerRef) => {
    const drawn = this.state.deck.slice(0, 1)
    const remainingDeck = this.state.deck.slice(1)

    this.setState({ 
      [playerRef]: { 
        hand: sortByValue([...this.state[playerRef].hand, ...drawn]),
        score: this.state[playerRef].score 
      },
      deck: remainingDeck
    }, async () => await this.checkAndHandleMatch());
  }

  drawStartingHands = () => {
    const playerDrawn = sortByValue(this.state.deck.slice(0, 7));
    const aiDrawn = sortByValue(this.state.deck.slice(7, 14));
    const remainingDeck = this.state.deck.slice(14)

    this.setState({ 
      player: { 
        hand: [...playerDrawn], 
        score: this.state.player.score 
      },
      ai: { 
        hand: [...aiDrawn],
        score: this.state.ai.score 
      },
      deck: remainingDeck
    });
  }

  shuffleDeck = () => {
    this.setState({deck: shuffle([...DECK])})
  }

  aiPickCard = () => {
    const pick = Math.floor(Math.random()*this.state.ai.hand.length)
    return this.state.ai.hand[pick]
  }

  switchActivePlayer = async () => {
    if (this.state.activePlayer === 'ai') {
      this.setState({ 
        activePlayer: 'player',
        inactivePlayer: 'ai'
      }, () => console.log('It\'s your turn! Pick a card!'))
    }
    if (this.state.activePlayer === 'player') {
      this.setState({ 
        activePlayer: 'ai',
        inactivePlayer: 'player'
      }, () => {
        console.log('It\'s your opponent\'s turn!')
        console.log('Your opponent is thinking...')
        
        this.handleCardRequest(this.aiPickCard())
      })
    }    
  }

  checkAndHandleMatch = async () => {
    //Reads state to determine the current active player
    //Checks the active player's hand for sets of four cards
    //If a set is found, removes the set of four from the active player's hand and increments their score by 1
    const activePlayer = this.state.activePlayer;
    const activeHand = this.state[activePlayer].hand;
    const match = handContainsMatch(this.state[activePlayer].hand)
      

      if (match) {
        console.log(`${activePlayer} matched a set of four ${match.slice(1)}'s`)
        this.setState({
          [activePlayer]: {
            hand: activeHand.filter(card => !card.includes(match.slice(1))),
            score: this.state[activePlayer].score + 1
          }
        })
      }
  }

  handleCardRequest = async (cardId) => {
    //Takes a cardId
    //Reads state to determine the current active player
    //Checks inactive player's hand to determine if the selected card is present
    
    const activePlayer = this.state.activePlayer;
    const inactivePlayer = this.state.inactivePlayer;
    let activeHand = [...this.state[activePlayer].hand];
    let inactiveHand = [...this.state[inactivePlayer].hand];
    console.log(`${activePlayer} says:`)
    console.log(cardCodeToRequest(cardId))

    if (handContainsCard(cardId, inactiveHand)) {
      //If present, removes all cards of the given value from the inactive player's hand and adds them to the active player's hand
      console.log('Card found in other hand! Pick Another card!')
      activeHand = sortByValue([...activeHand, ...inactiveHand.filter(card => card.includes(cardId.slice(1)))])
      
      console.log(`${inactivePlayer}'s hand: ${inactiveHand}`)
      inactiveHand = inactiveHand.filter(card => !card.includes(cardId.slice(1)))

      this.setState({
        [activePlayer]: {
          hand: activeHand,
          score: this.state[activePlayer].score
        },
        [inactivePlayer]: {
          hand: inactiveHand,
          score: this.state[inactivePlayer].score
        }
      }, async () => {
        await this.checkAndHandleMatch()
        if (activePlayer==='ai') this.handleCardRequest(this.aiPickCard())
      })
      

      

            
    } else {
      //If not present, active player draws one card
      console.log('no matching card found in other hand')
      console.log('drawing a card instead...')
      //Check the top card of the deck (before it's drawn) and see if it's a match to the card the player requested
      const match = this.state.deck[0].slice(1) === cardId.slice(1)
      if (match) console.log(`Lucky! ${activePlayer} drew another ${cardId.slice(1)}! Pick another card.`)

      this.drawCard(activePlayer)

      console.log(`${inactivePlayer}'s hand: ${inactiveHand}`)

      if (!match) this.switchActivePlayer();
      if (match && activePlayer === 'ai') this.handleCardRequest(this.aiPickCard())
      
    }
  }



  //////////////////////////////////////////

  componentDidMount() {
    this.startGame();    
  }  

  render() {
    const gameContextValue={
      playerHand: this.state.player.hand,
      playerScore: this.state.player.score,
      aiHand: this.state.ai.hand,
      aiScore: this.state.ai.score,
      cardsInDeck: this.state.deck.length,
      drawCard: this.drawCard,
      switchActivePlayer: this.switchActivePlayer,
      handleCardRequest: this.handleCardRequest
    }

    return (
    <div className="App">
      <GameContext.Provider value={gameContextValue}>
        <GameScreen />
      </GameContext.Provider>
    </div>
    )
  }
}

export default App;
