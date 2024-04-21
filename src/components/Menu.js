import React, { useState } from 'react'

function Menu() {
  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  const [addFriend, setAddFriend] = useState(false);
  const [input, setInput] = useState('');

  function handleCopyCode() {
    // Create a new text area element
    const textArea = document.createElement('textarea');
  
    // Set the text content of the text area element
    textArea.textContent = localStorage.getItem('share');
  
    // Add the text area element to the document
    document.body.appendChild(textArea);
  
    // Select the text area element
    textArea.select();
  
    // Execute the copy command
    document.execCommand('copy');
  
    // Remove the text area element from the document
    document.body.removeChild(textArea);
  }

  const handleAddFriendButton = () => {
    if(addFriend) {
      setAddFriend(false);
    } else {
      setAddFriend(true);
    }
  }
    return (
    <div className='main-menu-container'>
      <div className="friend-add-container">
              <button className='menu-buttons-copy' onClick={handleCopyCode}>Copy your code</button>
              <div className='add-friend-input-container'>
              <input className='add-friend-input' placeholder="Enter friend's code"></input>
              <button className='menu-buttons-add' onClick={handleAddFriendButton}>Add friend</button>
              </div>
      </div>
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
    </div>
    )
}

export default Menu