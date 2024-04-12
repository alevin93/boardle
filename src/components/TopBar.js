import React from 'react'

function TopBar() {

  const handleMenuButton = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="header-container">
        <div className='header-title-text'>BOARDLE</div>
        <div className='menu-buttons-container'>
            <button className='menu-buttons' onClick={handleMenuButton} >MENU</button>
        </div>
    </div>
  )
}

export default TopBar