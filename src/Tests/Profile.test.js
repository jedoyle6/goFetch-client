import React from 'react';
import ReactDOM from 'react-dom';
import Profile from '../Components/Profile';
import GameContext from '../GameContext';
import { testGameContextValue } from './test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameContext.Provider value={testGameContextValue}>
      <Profile />
    </GameContext.Provider>
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
