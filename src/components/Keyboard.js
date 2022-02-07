import React from 'react';

import "./Keyboard.css";
import { alphabet } from '../data/Alphabet';

import KeyboardLetter from './KeyboardLetter';
export default function Keyboard({keyboard, handleKeyboard}) {
  let first_row = keyboard.slice(0, 10);
  let second_row = keyboard.slice(10, 19);
  let third_row = keyboard.slice(19);


  return (
      <div className="Keyboard">
          <div className="Row">
            {first_row.map((status,i) => {
                return (<KeyboardLetter key={`letter-${alphabet[i]}`} status={status} letter={alphabet[i]} handleKeyboard={handleKeyboard} />)
            })}
          </div>

          <div className="Row" style={{width: "90%"}}>
            {second_row.map((status,i) => {
                return (<KeyboardLetter key={`letter-${alphabet[i]}`} status={status} letter={alphabet[i + 10]} handleKeyboard={handleKeyboard} />)
            })}
          </div>

          <div className="Row">
            <KeyboardLetter letter={"Enter"} controls="submit" status="" handleKeyboard={handleKeyboard} />
            {third_row.map((status,i) => {
                return (<KeyboardLetter key={`letter-${alphabet[i]}`} status={status} letter={alphabet[i + 19]} handleKeyboard={handleKeyboard} />)
            })}
            <KeyboardLetter letter={<span className="material-icons">backspace</span>} status="" controls="backspace" handleKeyboard={handleKeyboard} style={{lineHeight: "62px"}} />
          </div>
          
      </div>
  );
}
