import React from "react";
import "./GameOverPane.css";

import Word from "../components/Word";
export default function GameOverPane({ gameState, word, match, guessAmount, restartMatch }) {
    
  return (
    <div className="GameOverPane Pane">
      <div className="GameOverPaneHeader">
        <div className="GameOverPaneLeft"></div>
        <div className="GameOverPaneHeaderText">
          YOU {gameState === "win" ? "WIN!" : "LOST..."}
        </div>
        <div className="GameOverPaneRight"></div>
      </div>

      {gameState === "win" ? (
        <>
          <div className="FinalGuess">
            <p>Congrats on matching the correct answer!</p>
            <Word key={`final-guess`} word={match} match={match} guess />
            <p>You found the word in {guessAmount} tries!</p>
          </div>
        </>
      ) : (
        <>
          <div className="FinalGuess">
            <p>Your final guess was...</p>
            <Word key={`final-guess`} word={word} match={match} guess />
          </div>
          <div className="FinalGuess">
            <p>The actual word was</p>
            <Word key={`final-match`} word={match} match={match} guess />
          </div>
        </>
      )}

      <div className="Button" style={{margin: "15px auto", width: "150px", textAlign: "center"}} onClick={restartMatch}>Play Again?</div>
    </div>
  );
}
