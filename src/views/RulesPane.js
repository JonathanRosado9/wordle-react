import React from "react";
import "./RulesPane.css";

import Word from "../components/Word";
export default function RulesPane({ letterAmount, exitRules, shownTutorial }) {
  return (
    <div className="RulesPane Pane">
      <div className="RulesPaneHeader">
        <div className="RulesPaneLeft"></div>
        <div className="RulesPaneHeaderText">HOW TO PLAY</div>
        <div className="ExitButton" onClick={exitRules}>
          &times;
        </div>
      </div>
      <p>Guess the WORD in {letterAmount + 1} tries</p>
      <p>
        Each guess must be a {letterAmount} letter word. Press Enter to submit
        your guess.
      </p>
      <p>
        After each guess, the color of the tiles will change to show how close
        your guess was to the word.
      </p>
      <hr />
      <p>
        <strong>Examples</strong>
      </p>
      <Word word="weary" match="wondo" guess tutorial />

      <p>
        The letter <strong>W</strong> is in the word and in the correct spot.
      </p>

      <Word word="pilot" match="endrl" guess tutorial />

      <p>
        The letter <strong>L</strong> is in the word but in the wrong spot.
      </p>

      <Word word="vague" match="vagse" guess tutorial reverse />

      <p>
        The letter <strong>U</strong> is not in the word in any spot.
      </p>

      <hr />
      {shownTutorial ? (
        <>
          <p>
            You can change the amount of letters in a word, or refresh the word
            using the settings button in the top-right corner of the screen.
          </p>
          <h4>Have fun!</h4>
        </>
      ) : (
        <>
          <div className="Button" style={{marginTop: "15px", textAlign: "center"}} onClick={exitRules}>Click here to Start Playing!</div>
        </>
      )}
    </div>
  );
}
