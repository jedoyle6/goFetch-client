import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameScreen from './Components/GameScreen';
import SummaryScreen from './Components/SummaryScreen';
import { DECK, shuffle, sortByValue, handContainsCard, handContainsMatch, cardCodeToRequest } from './Helpers/helpers';
import GameContext from './GameContext';
import Leaderboard from './Components/Leaderboard';
import HomeScreen from './Components/HomeScreen';
import ApiService from './Helpers/ApiService';

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
    message: 'It\'s your turn! Pick a card!',
    playerId: 2,
    cardsLocked: false
  }

  asyncSetState = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  pause = (delay) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay)
    });
  }

  displayText = async (text, delay) => {
    await this.asyncSetState({message: text})
    return this.pause(delay)
  }

  startGame = async () => {
    await this.shuffleDeck();
    await this.drawStartingHands();
  }

  endGame = () => {
    const playerScore = this.state.player.score;
    const aiScore = this.state.ai.score;
    if (playerScore > aiScore) ApiService.reportGameScore(this.state.playerId, this.state.player.score)
  }

  checkEndGame = () => {
    //The game should end if either player has 0 cards in hand, or if the deck has 0 cards in it.
    return (this.state.player.hand.length === 0 || this.state.ai.hand.length === 0 || this.state.deck.length === 0)
  }

  drawCard = async (playerRef) => {
    const drawn = this.state.deck.slice(0, 1)
    const remainingDeck = this.state.deck.slice(1)

    return this.asyncSetState({ 
      [playerRef]: { 
        hand: sortByValue([...this.state[playerRef].hand, ...drawn]),
        score: this.state[playerRef].score 
      },
      deck: remainingDeck
    })
  }

  drawStartingHands = () => {
    const playerDrawn = sortByValue(this.state.deck.slice(0, 7));
    const aiDrawn = sortByValue(this.state.deck.slice(7, 14));
    const remainingDeck = this.state.deck.slice(14)

    return this.asyncSetState({ 
      player: { 
        hand: [...playerDrawn], 
        score: 0 
      },
      ai: { 
        hand: [...aiDrawn],
        score: 0 
      },
      deck: remainingDeck
    });
  }

  shuffleDeck = () => {
    return this.asyncSetState({deck: shuffle([...DECK])})
  }

  aiPickCard = () => {
    const pick = Math.floor(Math.random()*this.state.ai.hand.length)
    return this.state.ai.hand[pick]
  }

  switchActivePlayer = async () => {
    if (this.state.activePlayer === 'ai') {
      return this.asyncSetState({ 
        activePlayer: 'player',
        inactivePlayer: 'ai'
      })
    }
    if (this.state.activePlayer === 'player') {
      return this.asyncSetState({ 
        activePlayer: 'ai',
        inactivePlayer: 'player'
      })
    }    
  }

  lockHand = async () => {
    return this.asyncSetState({cardsLocked: true})
  }

  unlockHand = async () => {
    return this.asyncSetState({cardsLocked: false})
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
        await this.displayText(`${activePlayer} matched a set of four ${match.slice(1)}'s`, 1500)
        return this.asyncSetState({
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
    console.log(`${activePlayer}'s hand: ${activeHand}`)
    console.log(`${inactivePlayer}'s hand: ${inactiveHand}`)
    console.log(`${activePlayer} says: ${cardCodeToRequest(cardId)}`)
    //Lock the hand so the player can't button mash
    await this.lockHand()
    await this.displayText(`${activePlayer} says: ${cardCodeToRequest(cardId)}`, 1500)

    if (handContainsCard(cardId, inactiveHand)) {
      //If present, removes all cards of the given value from the inactive player's hand and adds them to the active player's hand

      activeHand = sortByValue([...activeHand, ...inactiveHand.filter(card => card.includes(cardId.slice(1)))])      
      inactiveHand = inactiveHand.filter(card => !card.includes(cardId.slice(1)))

      await this.asyncSetState({
        [activePlayer]: {
          hand: activeHand,
          score: this.state[activePlayer].score
        },
        [inactivePlayer]: {
          hand: inactiveHand,
          score: this.state[inactivePlayer].score
        }
      })
      //Checks for any matches of four cards
      //Checks for endgame state
      //Checks to see if it's the AI's turn - if it is, the AI takes another turn
      console.log('Matching card found in other hand! Pick another card!')
      
      await this.checkAndHandleMatch()
      if (this.checkEndGame()) {
        this.endGame()
      } else if (activePlayer==='ai') {
        await this.displayText('Matching card found in other hand! Pick another card!', 1500)
        this.handleCardRequest(this.aiPickCard())
      } else {
        await this.displayText('Matching card found in other hand! Pick another card!', 1)
        await this.unlockHand() //Unlock the player's hand so they can go again
      }
      
            
    } else {
      //If the requested card is not present, active player draws one card
      console.log('No matching card found! Go Fish!')
      await this.displayText('No matching card found! Go Fish!', 1500)
      //Check the top card of the deck (before it's drawn) and see if it's a match to the card the player requested
      const match = this.state.deck[0].slice(1) === cardId.slice(1)
      //Then draw the card and process any matches
      await this.drawCard(activePlayer)
      await this.checkAndHandleMatch()

      //Check for endgame state
      //If the game is over, display the endgame prompt
      if(this.checkEndGame()) {
        this.endGame()
      }
      //Otherwise, if the card is a match, the active player gets another turn
      //Have the AI request another card, if it's the AI's turn
      else if (match) {
        console.log(`Lucky! ${activePlayer} drew another ${cardId.slice(1)}! Pick another card.`)
                
        if (activePlayer === 'ai') {
          await this.displayText(`Lucky! ${activePlayer} drew another ${cardId.slice(1)}! Pick another card.`, 1500)
          this.handleCardRequest(this.aiPickCard())
        }
        if (activePlayer === 'player') {
          await this.displayText(`Lucky! ${activePlayer} drew another ${cardId.slice(1)}! Pick another card.`, 1)
          await this.unlockHand() //Unlock the player's hand so they can go again
        }
      }
      //If the card is not a match, switch active players.
      //If this would cause it to be the AI's turn, have the AI take a turn.
      else if (!match) {
        await this.switchActivePlayer();
        if (this.state.activePlayer === 'ai') {
          await this.displayText(`It's your opponent's turn!`, 1500)
          this.handleCardRequest(this.aiPickCard())
        } else if (this.state.activePlayer === 'player') {
          await this.displayText(`It's your turn! Pick a card!`, 1)
          await this.unlockHand() //Unlock the player's hand so they can go again
        }        
      }      
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
      handleCardRequest: this.handleCardRequest,
      restartGame: this.startGame,
      message: this.state.message,
      cardsLocked: this.state.cardsLocked,
      lockHand: this.lockHand
    }

    return (
    <div className="App">
      <GameContext.Provider value={gameContextValue}>
        <Switch>
          <Route exact path='/' component={HomeScreen}/>
          <Route path='/leaderboard' component={Leaderboard} />
          {
            this.checkEndGame() &&
            <Route path='/game' component={SummaryScreen} />
          }
          <Route path='/game' component={GameScreen} />

        </Switch>        
      </GameContext.Provider>
    </div>
    )
  }
}

export default App;
