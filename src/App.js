import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameScreen from './Components/GameScreen';
import SummaryScreen from './Components/SummaryScreen';
import { DECK, shuffle, sortByValue, handContainsCard, handContainsMatch, cardCodeToRequest, cardCodeToPluralName, getAiName, cardCodeToName } from './Helpers/helpers';
import GameContext from './GameContext';
import Leaderboard from './Components/Leaderboard';
import HomeScreen from './Components/HomeScreen';
import ApiService from './Helpers/ApiService';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import Rules from './Components/Rules';
import TokenService from './Helpers/TokenService';
import PrivateOnlyRoute from './Helpers/PrivateOnlyRoute';
import PublicOnlyRoute from './Helpers/PublicOnlyRoute';
import NavBar from './Components/NavBar';

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
    cardsLocked: false,

    user_name: null,
    total_points: null,
    rank: null,
    totalPlayers: null,
    team_id: null,

    ai_team: null,

    summary_header: '',
    summary_footer: '',

    showIntro: true
    
  }

  forceEndGame = async () => {
    await this.asyncSetState({
      player: {
        hand: [],
        score: 5
      },
      ai: {
        hand: [],
        score: 3
      }
    })
    this.endGame()
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
    await this.asyncSetState({ai_team: Math.floor(Math.random()*3)+1})
    if (!TokenService.hasAuthToken()) {
      await this.asyncSetState({
        team_id: Math.floor(Math.random()*3)+1,
      })
    } else if (TokenService.hasAuthToken() && !this.state.team_id) {
      await ApiService.getProfileData()
        .then(profileData => {
          const {user_name, total_points, team_id, rank, totalPlayers} = profileData;
          return this.asyncSetState({
              user_name,
              total_points,
              team_id,
              rank,
              totalPlayers
          });
      })
      .catch(err => console.log(err.message))
    }
  }

  endGame = () => {
    const playerScore = this.state.player.score;
    const aiScore = this.state.ai.score;
    if (playerScore > aiScore && TokenService.hasAuthToken()) {
      ApiService.reportGameScore(this.state.player.score)
      this.setState({
        summary_header: 'You Win!',
        summary_footer: `You earn ${playerScore} points!`
      })
    } else if (playerScore > aiScore) {
      this.setState({
        summary_header: 'You Win!',
        summary_footer: ''
      })
    } else if (playerScore < aiScore) {
      this.setState({
        summary_header: 'The AI Wins!',
        summary_footer: 'Better luck next time!'
      })
    } else {
      this.setState({
        summary_header: 'It\'s a Draw!',
        summary_footer: 'What a close match!'
      })
    }
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
    let speaker;
    if (activePlayer === 'player') {
      speaker = 'You'
    } else {
      speaker = getAiName(this.state.ai_team)
    }

      if (match) {
        await this.displayText(`${speaker} matched a set of four ${cardCodeToPluralName(match)}!`, 1500)
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
    let activeSpeaker;
    let inactiveSpeaker;
    if (activePlayer === 'player') {
      activeSpeaker = 'You';
      inactiveSpeaker = getAiName(this.state.ai_team);
    } else {
      activeSpeaker = getAiName(this.state.ai_team);
      inactiveSpeaker = 'You';
    }

    //Lock the hand so the player can't button mash
    await this.lockHand()
    await this.displayText(`${activeSpeaker}: ${cardCodeToRequest(cardId)}`, 1500)

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
      
      
      if (this.checkEndGame()) {
        this.endGame()
      } else if (activePlayer==='ai') {
        await this.displayText(`You hand over your ${cardCodeToPluralName(cardId)}.`, 1500)
        await this.checkAndHandleMatch()
        this.handleCardRequest(this.aiPickCard())
      } else {
        await this.displayText(`${inactiveSpeaker}: Here you go!`, 1500)
        await this.displayText(`${inactiveSpeaker} hands you their ${cardCodeToPluralName(cardId)}.`, 1500)
        await this.checkAndHandleMatch()
        await this.displayText(`Pick another card!`, 1)
        await this.unlockHand() //Unlock the player's hand so they can go again
      }
      
            
    } else {
      //If the requested card is not present, active player draws one card
      await this.displayText(`${inactiveSpeaker}: Sorry! Go Fish!`, 1500)
      //Check the top card of the deck (before it's drawn) and see if it's a match to the card the player requested
      const match = this.state.deck[0].slice(1) === cardId.slice(1)
      //Then draw the card and process any matches
      await this.drawCard(activePlayer)
      if (match && activePlayer === 'player') {
        await this.displayText(`Lucky! ${activeSpeaker} drew another ${cardCodeToName(cardId)}!`, 1000)
      }
      await this.checkAndHandleMatch()

      //Check for endgame state
      //If the game is over, display the endgame prompt
      if(this.checkEndGame()) {
        this.endGame()
      }
      //Otherwise, if the card is a match, the active player gets another turn
      //Have the AI request another card, if it's the AI's turn
      else if (match) {
                
        if (activePlayer === 'ai') {
          await this.displayText(`Lucky! ${activeSpeaker} drew another ${cardCodeToName(cardId)}!`, 1500)
          this.handleCardRequest(this.aiPickCard())
        }
        if (activePlayer === 'player') {
          await this.displayText(`Pick another card.`, 1)
          await this.unlockHand() //Unlock the player's hand so they can go again
        }
      }
      //If the card is not a match, switch active players.
      //If this would cause it to be the AI's turn, have the AI take a turn.
      else if (!match) {
        await this.switchActivePlayer();
        if (this.state.activePlayer === 'ai') {
          await this.displayText(`It's ${getAiName(this.state.ai_team)}'s turn!`, 1500)
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
      lockHand: this.lockHand,
      asyncSetState: this.asyncSetState,
      user_name: this.state.user_name,
      total_points: this.state.total_points,
      rank: this.state.rank,
      totalPlayers: this.state.totalPlayers,
      team_id: this.state.team_id,
      ai_team: this.state.ai_team,
      forceEndGame: this.forceEndGame,
      summary_header: this.state.summary_header,
      summary_footer: this.state.summary_footer,
      showIntro: this.state.showIntro,
      hideIntro: () => {this.setState({showIntro: false})}

    }

    return (
    <div className="App">
      <GameContext.Provider value={gameContextValue}>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomeScreen}/>
          <Route path='/leaderboard' component={Leaderboard} />
          {
            this.checkEndGame() &&
            <Route path='/game' component={SummaryScreen} />
          }
          <Route path='/game' component={GameScreen} />
          <PublicOnlyRoute path='/login' component={Login} />
          <PublicOnlyRoute path='/signup' component={SignUp} />
          <PrivateOnlyRoute path='/profile' component={Profile} />
          <Route path='/rules' component={Rules} />

        </Switch>        
      </GameContext.Provider>
    </div>
    )
  }
}

export default App;
