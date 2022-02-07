import React from 'react';

import "./WordGrid.css";
import Word from './Word';

export default function WordGrid({match, guesses, tries}) {
  let letter_amount = match.length;

  let grid_array = [];

  //Pass guesses onto grid
  for(let word of guesses) {
      grid_array.push(word);
  }

  //Fill out empty guesses
  for(let i = grid_array.length; i <= letter_amount; i++) {
      grid_array.push("");
  }
  
  return (
      <div className="WordGrid">
          {grid_array.map((word, i) => {
              let guess = false;
              if (tries > i) {
                  guess = true;
              } 
              return (<Word key={`guess-${i}`} word={word} match={match} guess={guess} />);
          })}
      </div>
  );
}
