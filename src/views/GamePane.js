import React from 'react';
import './GamePane.css';

import Keyboard from "../components/Keyboard";
import WordGrid from '../components/WordGrid';
export default function GamePane({match, guesses=[], keyboard, handleKeyboard, tries, openSettings, openRules}) {
    
  return (
      <div className="GamePane Pane">
          <div className="GamePaneHeader">
                <div className="RulesButton" onClick={openRules}><span className="material-icons">question_mark</span></div>
                <div className="HeaderBrand">WORDLE</div>
                <div className="SettingsButton" onClick={openSettings}><span className="material-icons">settings</span></div>
          </div>
          <div className="GamePaneGrid">
            <WordGrid match={match} guesses={guesses} tries={tries} />
          </div>
          
          <div className="GamePaneKeyboard">
            <Keyboard keyboard={keyboard} handleKeyboard={handleKeyboard} />
          </div>
      </div>
  );
}
