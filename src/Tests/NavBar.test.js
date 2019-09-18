import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Components/NavBar';
import GameContext from '../GameContext';
import { testGameContextValue } from './test-helpers';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
    <GameContext.Provider value={testGameContextValue}>
      <NavBar />
    </GameContext.Provider>
    </BrowserRouter>    
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
