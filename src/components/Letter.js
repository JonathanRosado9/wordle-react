import React from 'react';
import './Letter.css';
export default function Letter({letter=" ", type="empty"}) {
  return (
      <div className={`Letter ${type}`} >
          {letter}
      </div>
  );
}
