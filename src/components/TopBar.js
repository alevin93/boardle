import React,{ useState } from 'react'

function TopBar(props) {
  

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { toggleMenu } = props;

  return (
      <div className="header-container">
          <div className='header-title-text'>BOARDLE</div>
          <div className='menu-buttons-container'>
              <button className='menu-buttons' onClick={toggleMenu} >MENU</button>
          </div>
      </div>
    )
}

export default TopBar
