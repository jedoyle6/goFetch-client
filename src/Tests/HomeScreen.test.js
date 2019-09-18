import React from 'react';
import ReactDOM from 'react-dom';
import Homescreen from '../Components/HomeScreen';
import GameContext from '../GameContext';
import { testGameContextValue } from './test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameContext.Provider value={testGameContextValue}>
      <Homescreen />
    </GameContext.Provider>
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
