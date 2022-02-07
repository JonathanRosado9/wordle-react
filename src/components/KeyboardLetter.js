import React from 'react';
import "./KeyboardLetter.css";
export default function KeyboardLetter({status, letter, controls=false, handleKeyboard, style={}}) {

  let handleClick = () => {
      if (controls) {
        handleKeyboard(controls);
      } else {
        handleKeyboard(letter);
      }
      
  }

  let styles = {...style};

  if (controls) {
    styles.width = "50px";
  }
  return (
        <div className={`KeyboardLetter ${status}`} style={styles} onClick={handleClick}>
            {letter}
        </div>
    );
}
