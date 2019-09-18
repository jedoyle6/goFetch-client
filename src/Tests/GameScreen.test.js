import React from 'react';
import ReactDOM from 'react-dom';
import GameScreen from '../Components/GameScreen';
import GameContext from '../GameContext';
import { testGameContextValue } from './test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameContext.Provider value={testGameContextValue}>
      <GameScreen />
    </GameContext.Provider>
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
