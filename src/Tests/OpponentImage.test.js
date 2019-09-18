import React from 'react';
import ReactDOM from 'react-dom';
import OpponentImage from '../Components/OpponentImage';
import GameContext from '../GameContext';
import { testGameContextValue } from './test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameContext.Provider value={testGameContextValue}>
      <OpponentImage />
    </GameContext.Provider>
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
