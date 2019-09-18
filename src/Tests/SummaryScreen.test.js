import React from 'react';
import ReactDOM from 'react-dom';
import SummaryScreen from '../Components/SummaryScreen';
import GameContext from '../GameContext';
import { testGameContextValue } from './test-helpers';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
    <GameContext.Provider value={testGameContextValue}>
      <SummaryScreen />
    </GameContext.Provider>
    </BrowserRouter>    
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
