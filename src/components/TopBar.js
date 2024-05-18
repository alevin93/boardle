import React, { useState } from 'react';

function TopBar({ toggleMenu }) {

  return (
    <div className="header-container">
      <div className='header-title-text'>BOARDLE</div>
      <div className='menu-buttons-container'>
        <button className='menu-buttons' onClick={toggleMenu}>MENU</button>
      </div>
    </div>
  );
}

export default TopBar;