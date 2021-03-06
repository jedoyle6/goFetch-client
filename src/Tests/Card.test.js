import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../Components/Card';
import GameContext from '../GameContext';
import { testGameContextValue } from './test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameContext.Provider value={testGameContextValue}>
      <Card id={'s01'}/>
    </GameContext.Provider>
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
