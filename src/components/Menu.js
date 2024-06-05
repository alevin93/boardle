import React, { useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close';


function Menu() {

  
  const BASE_URL=process.env.REACT_APP_BASE_URL;
  const WEBSITE=process.env.REACT_APP_WEBSITE;

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  

  const [addFriend, setAddFriend] = useState(false);
  const [input, setInput] = useState('');
  const [manageFriends, setManageFriends] = useState(false);
  const [friendsArray, setFriendsArray] = useState([]);

  useEffect( () => {
    if(manageFriends) {
      handleManageFriends();
    }

  }, [manageFriends])

  const handleAddFriend = async () => {
    const response = await fetch(`${BASE_URL}/linkFriends`, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({ user : localStorage.getItem('share'), friend : input, token: localStorage.getItem('token')})
    })
    const data = await response.json();
    console.log("Data is: ", await JSON.parse(data).error);
    if(JSON.parse(data).error) {
      alert(JSON.parse(data).error);
    } else {
      alert('Friend added!');
    }
    window.location.reload();
  }

  const friendsToggle = () => {
    if(manageFriends) {
      setManageFriends(false);
    } else {
      setManageFriends(true);
    }
  }

  const handleManageFriends = async () => {
    console.log(localStorage.getItem('user'))
    const response = await fetch(`${BASE_URL}/fetchFriends`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ "user": localStorage.getItem("user"), "token": localStorage.getItem("token")}),
    })
    const data = await response.json();

    console.log(data.friends);

    const newData = JSON.parse(data.friends);
    console.log(newData);
    setFriendsArray(newData ? newData : []);
  }

  const handleRemoveFriend = async (id) => {
    const tempArray = friendsArray.filter(friend => friend.id !== id);
    setFriendsArray(tempArray);
    console.log(tempArray);
    const response = await fetch(`${BASE_URL}/removeFriend`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ "user" : localStorage.getItem("user"), "token" : localStorage.getItem("token"), "friends" : tempArray})
    })
    const data = await response;
    console.log(data);
  }

  function handleCopyCode() {
    // Create a new text area element
    const textArea = document.createElement('textarea');
  
    // Set the text content of the text area element
    textArea.textContent = `${WEBSITE}/add/${localStorage.getItem('share')}`;
  
    // Add the text area element to the document
    document.body.appendChild(textArea);
  
    // Select the text area element
    textArea.select();
  
    // Execute the copy command
    document.execCommand('copy');
  
    // Remove the text area element from the document
    document.body.removeChild(textArea);
    alert('Link Copied!');
  }
  if(!manageFriends) {
    return (
    <>
    <div className='main-menu-container.show'>
      <div className="friend-add-container">
              <p>Your friend code is:</p>
              <h3 className='friend-code-text'>{localStorage.getItem("share")}</h3>
              <button className='menu-buttons-copy' onClick={handleCopyCode}>Copy share link</button>
              <div className='add-friend-input-container'>
              <input className='add-friend-input' placeholder="Enter friend's code" onChange={(e) => {
            setInput(e.target.value)}}></input>
              <button className='menu-buttons-add' onClick={handleAddFriend}>Add friend</button>
              </div>
              <button className='manage-friends-button' onClick={friendsToggle}>Manage Friends</button>
      </div>
      <div className='register-card-container'>
      <div className='menu-card-container'>
      <h1 className='logged-in-as-text'>Logged in as: {localStorage.getItem("name")}</h1>
      <p>Your private passkey is:</p>
      <h3 className='private-passkey'>{localStorage.getItem("user")}</h3>
      <p>(You can use this to recover your account)</p>
      
      <button onClick={handleLogOut} className='log-out-button' >LOG OUT</button>
      </div>
      <div className='coffee-container'>
      <a className='buy-me-a-coffee' href="https://buymeacoffee.com/alevin93" target="_blank">☕Buy me a coffee?☕</a>
      </div>
      </div>
    </div>
    </>
    )
  }
  else {
    return (
      <>
      <div className='manage-friends-container.show'>
        <div className='manage-friends-header'>
        <p>Manage Friends</p>
        <button className='menu-buttons' onClick={friendsToggle}><CloseIcon /></button>
        </div>
        <ul className="friend-list">
            {/* Map over friendsArray and render list items with names and buttons */}
            {friendsArray.map((friend) => (
              <p key={friend.id || friend._id}> {/* Use a unique identifier for each friend */}
                <span className="friend-name">{friend.name}</span>
                {/* Add button functionality based on your requirements */}
                <button className="remove-friend-button" onClick={() => handleRemoveFriend(friend.id)} >REMOVE</button>
              </p>
            ))}
          </ul>
      </div>
      </>
      )
  }
}

export default Menu