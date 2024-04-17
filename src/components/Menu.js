import React from 'react'

function Menu() {
  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div className='register-card-container'>
    <div className='create-user-container'><p>Menu</p>
    <h1>Logged in as: {localStorage.getItem("name")}</h1>
    <p>Your private passkey is:</p>
    <h3 className='private-passkey'>{localStorage.getItem("user")}</h3>
    <p>Your friend code is:</p>
    <h3>{localStorage.getItem("share")}</h3>
    
    <button onClick={handleLogOut} >LOG OUT</button>
    </div>
    </div>
  )
}

export default Menu