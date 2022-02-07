import { useState, useEffect } from "react";
import "./App.css";

import { dictionary } from "./data/Dictionary";
import { defaultStatus, alphabet } from "./data/Alphabet";
import IntroPane from "./views/IntroPane";
import GamePane from "./views/GamePane";
import RulesPane from "./views/RulesPane";
import SettingsPane from "./views/SettingsPane";
import GameOverPane from "./views/GameOverPane";

const START_GUESSES = 5;
function App() {
  //Initialize State Variables
  //Game State - Determines state (intro,play,tutorial,win,lose)
  let [gameState, setGameState] = useState("intro");

  let storageTutorial = localStorage.getItem("tutorial");

  if (!storageTutorial) {
    storageTutorial = false;
  }

  //Determines if Tutorial has already been shown. To prevent tutorial from showing everytime, and to show at least once.
  let [shownTutorial, setShownTutorial] = useState(storageTutorial);

  let amountStorage = localStorage.getItem("letteramount");

  if (!amountStorage) {
    amountStorage = START_GUESSES;
  } else {
    amountStorage = parseInt(amountStorage);
  }

  //Amount of letters in guess
  let [letterAmount, setLetterAmount] = useState(amountStorage);

  //The status of each of the letters of the keyboard (not found, matches, in word)
  let [keyboard, setKeyboard] = useState(defaultStatus);

  //An array with each of the guesses. Initialized to empty array
  let [guesses, setGuesses] = useState([]);

  //Amount of guesses tried. Determines if game is over.
  let [tries, setTries] = useState(0);

  //Returns a random word from the dictionary with letter_amount of letters
  let setRandomWord = (letter_amount) => {
    const words = dictionary[letter_amount];
    const rand_i = Math.floor(Math.random() * words.length);
    return words[rand_i].toUpperCase();
  };

  //Determines word that should be matched
  let [match, setMatch] = useState(setRandomWord(letterAmount));

  //Closes rules, and starts game
  let exitRules = () => {
    if (!shownTutorial) {
      setShownTutorial(true);
      localStorage.setItem("tutorial", true);
    }
    setGameState("play");
  };

  //Opens rules
  let openRules = () => {
    setGameState("rules");
  };

  let restartMatch = () => {
    setGameState("play");
    resetMatch(letterAmount);
  }
  //Resets match to a new letter_amount length word. Resets Keyboard, Guesses and Tries as well
  let resetMatch = (letter_amount) => {
    setGuesses([]);
    setTries(0);
    setKeyboard(defaultStatus);
    setMatch(setRandomWord(letter_amount));
    setLetterAmount(letter_amount);
  };

  //Updates Keyboard after a new guess has been submitted. Sets the style of the keyboard button to match, not matched or in word.
  let updateKeyboard = (guess) => {
    setKeyboard((oldKeyboard) => {
      //Grabs the old keyboard array in state
      let newKeyboard = [...oldKeyboard];

      //Loops through it
      for (let i = 0; i < guess.length; i++) {
        //Gets index of word in alphabet (to determine position)
        let wordIndex = alphabet.indexOf(guess[i]);

        //If guess letter matches the actual match
        if (guess[i] === match[i]) {
          //Sets the status of that keyboard to match
          newKeyboard[wordIndex] = "match";

          //ELSE If the letter is in the word
        } else if (match.includes(guess[i])) {
          // And the letter doesn't already have a match status (to overwrite);
          // Sets to found (or in word)
          if (newKeyboard[wordIndex] !== "match") {
            newKeyboard[wordIndex] = "found";
          }
          //Else sets the status to not found.
        } else {
          newKeyboard[wordIndex] = "notfound";
        }
      }
      //Returns new array to state
      return newKeyboard;
    });
  };

  //Handles all Keyboard input
  let handleKeyboard = (letter) => {
    //Grabs final guess from guess array state
    let finalGuess = guesses[guesses.length - 1];

    console.log(letter + " is being pressed...");
    console.log(guesses, finalGuess);
    //If the letter is the 'Enter' key (Guess is to be submitted)
    if (letter === "submit") {
      //If the guess is as long as the match
      if (finalGuess && finalGuess.length >= letterAmount) {
        //If the amount of tries is smaller than the letter amount (since the amount of tries is always letter amount + 1)
        if (tries < letterAmount) {
          //set guesses state to previous state + new word (empty guess)
          setGuesses((guesses) => [...guesses, ""]);

          //Update the keyboard with what the user submitted
          updateKeyboard(finalGuess);
        }
        //Update Tries
        setTries((tries) => tries + 1);

        //If the match is equal to the submitted guess
        if (match === finalGuess) {
          //Change state to win! Congrats :)
          setGameState("win");
        } else {
          //If tries surpasses amount of letters
          if (tries >= letterAmount) {
            //Change state to lost. Too bad :(
            setGameState("lose");
          }
        }
      } else {
        //If the guess isn't as long as the match. Then user has submitted an invalid guess
        console.log("letters missing!");
      }
      //End function run
      return;
      //If letter submitted is backspace
    } else if (letter === "backspace") {
      //Checks if guess is empty. If so, end function run (Can't delete nothing...)
      if (!finalGuess) {
        return;
      }
    }

    //If there is a guess, and the guess' length is at least the letter amount, and the input is NOT backspace
    if (
      finalGuess &&
      finalGuess.length >= letterAmount &&
      letter !== "backspace"
    ) {
      //End function call, as you can't add another letter to the guess.
      return;
    }

    //Update guesses
    setGuesses((guesses) => {
      //Makes a new array, that gets all of the guesses, except the last one.
      let newGuesses = guesses.slice(0, guesses.length - 1);

      //Grabs the last guess
      let finalGuess = guesses[guesses.length - 1];

      //If it exists
      if (finalGuess) {
        //If input is backspace
        if (letter === "backspace") {
          //Remove last letter from guess.
          finalGuess = finalGuess.slice(0, -1);
        } else {
          //Else, add letter to guess
          finalGuess += letter;
        }
        //If guess does NOT exist
      } else {
        //Make the letter the first word of the guess
        finalGuess = letter;
      }

      //Return all old guesses, and the new final (current) guess.
      return [...newGuesses, finalGuess];
    });
  };

  let openSettings = () => {
    setGameState("settings");
  };

  let exitSettings = () => {
    setGameState("play");
  };

  //Render function of App component.
  //Renders Intro (Title), Rules (Tutorial), or Game Pane
  return (
    <div className="App">
      {gameState === "intro" ? (
        <IntroPane setGameState={setGameState} />
      ) : shownTutorial === false || gameState === "rules" ? (
        <RulesPane letterAmount={letterAmount} exitRules={exitRules} />
      ) : gameState === "settings" ? (
        <SettingsPane
          exitSettings={exitSettings}
          letterAmount={letterAmount}
          setLetterAmount={resetMatch}
        />
      ) : gameState === "win" || gameState === "lose" ? (
        <GameOverPane
          gameState={gameState}
          match={match}
          word={guesses[tries-1]}
          guessAmount = {guesses.length - 1}
          restartMatch = {restartMatch}
        />
      ) : (
        <GamePane
          match={match}
          guesses={guesses}
          keyboard={keyboard}
          handleKeyboard={handleKeyboard}
          tries={tries}
          openSettings={openSettings}
          openRules={openRules}
        />
      )}
    </div>
  );
}

export default App;
