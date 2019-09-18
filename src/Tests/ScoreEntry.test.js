import React from 'react';
import ReactDOM from 'react-dom';
import ScoreEntry from '../Components/ScoreEntry';
import GameContext from '../GameContext';
import { testGameContextValue } from './test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <GameContext.Provider value={testGameContextValue}>
        <table>
            <tbody>
            <ScoreEntry rank={3} name={'Billy Bulldog'} score={25} />
            </tbody>
        </table>      
    </GameContext.Provider>
  ,  div);
  ReactDOM.unmountComponentAtNode(div);
});
