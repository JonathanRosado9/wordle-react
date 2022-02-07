import React from 'react';
import './IntroPane.css';
export default function IntroPane({setGameState}) {
  return (
    <div className="IntroPane Pane">
      <div className="IntroBrand">
          <div className="BrandTitle">
            WORDLE
          </div>
          <div className="BrandSubtitle">
            React Clone
          </div>
      </div>

      <div className="IntroControls">
          <div className="ControlButton" onClick={() => {setGameState("play")}}>
              Start Game
          </div>
      </div>
    </div>
    );
}
