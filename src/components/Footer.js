import React, { useState } from 'react'
import BoardGames from './BoardGames';

function Footer({ toggleBG }) {

  return (
    <div class="footer-container">
    <div class="footer-content">
      <a class="buy-me-a-coffee" href="https://buymeacoffee.com/alevin93" target="_blank">☕Buy me a coffee?☕</a>
      <a class="board-game-button" onClick={toggleBG}>Board Games I Like</a>
      <p>Please hire me NYT Games</p>
    </div>
  </div>
  
  )
}

export default Footer