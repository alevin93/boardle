import React, { useState } from 'react';

function TopBar({ toggleMenu }) {

const [symbol, setSymbol] = useState('MENU');

const toggle = () => {
    toggleMenu();
    if (symbol === 'MENU') {
        setSymbol("X")
    }
    if (symbol === "X") {
        setSymbol("MENU");
    }
}



  return (
    <div className="header-container">
      <div className='header-title-text'>BOARDLE</div>
      <div className='menu-buttons-container'>
        <button className='menu-buttons' onClick={toggle}>{symbol}</button>
      </div>
    </div>
  );
}

export default TopBar;