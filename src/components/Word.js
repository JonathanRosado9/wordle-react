import React from 'react';
import './Word.css';
import Letter from './Letter';
import {v4 as uuidv4} from 'uuid';
export default function Word({word, match, guess=false, reverse=false, tutorial=false}) {
    //Split the word & match into an array to iterate
    let word_array = word.split("");
    let match_array = match.split("");

    //Store a second round array.
    //This to check for matches before checking if letter is in wrong place.
    //This prevents bugs. Example: MATCH: Those, GUESS: Geese
    //                   In a one round check, both initial e's will count as they are in the word, and the person would think the word has 3 e's.
    //                   By removing the letters when there is a match, it prevents this error.

    let second_round_match = [];
    //Saves match status, for render
    let matches = [];

    //Loops through word, finds matches and if not a match, pushes it into second round check (for word included in)
    //Also pushes match status of each letter to matches array
    for(let i = 0; i < word_array.length; i++) {
        if (word_array[i] === match_array[i]) {
            matches.push(true); 
        } else {
            matches.push(false);
            second_round_match.push(match_array[i]);
        }
    }
  return (
        <div className="Word">
            {match_array.map((letter, i) => {

                //Initializes style to not a match
                let style = "notmatch";

                //If match is found, set style to 'matched' tile
                if (matches[i] === true) {
                    style = "match";

                //Else if letter in match, set style to 'found in word' tile
                } else if (second_round_match.includes(word_array[i])) {
                    style = "found"
                }
                
                //If in tutorial or no guess has been entered, instead of 'notmatch' show 'empty'
                if ((!guess || tutorial)) {
                    if (tutorial && style === "notmatch") {
                        style = "empty";
                    }
                    if (!tutorial) {
                        style = "empty";
                    }
                }

                //Reverses matches & not matches. Used for tutorial to illustrate 'not found' letter.
                if (reverse) {
                    if (style === "match") {
                        style = "empty";
                    } else {
                        style = "notmatch";
                    }
                }
                return (<Letter key={uuidv4()} letter={word_array[i]} type={style} />)
                
            }          
            )}
        </div>
    );
}
