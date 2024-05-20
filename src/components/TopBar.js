import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';

function TopBar({ toggleMenu }) {

  return (
    <div className="header-container">
      <div className='header-title-text'>Boardle</div>
      <div className='menu-buttons-container'>
        <button className='menu-buttons' onClick={toggleMenu}><MenuIcon/></button>
      </div>
    </div>
  );
}

export default TopBar;