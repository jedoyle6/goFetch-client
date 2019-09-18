import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../Components/Card';
import GameContext from '../GameContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameContext.Provider value={{cardsLocked: false}}>
      <Card id={'s01'}/>
    </GameContext.Provider>
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
