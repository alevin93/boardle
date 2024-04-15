import React,{ useState } from 'react'

function TopBar(props) {
  

  const BASE_URL = process.env.BASE_URL;

  const { toggleMenu } = props;

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

  const handleAddFriend = async () => {
    const response = await fetch(`http://10.182.0.2:5500/addFriend`, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({ user : localStorage.getItem('user'), friend : input})
    }).then( response => window.location.reload());
    console.log(response);
  }

  if(addFriend) {
    return(
      <div className="header-container">
        <div>
          <input className='add-friend-input' placeholder='Enter friend code...' onChange={(e) => {
              setInput(e.target.value)}}></input>
          <button className='add-friend-submit' onClick={handleAddFriend}>submit</button>
          <button className='add-friend-cancel' onClick={handleAddFriendButton}>cancel</button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="header-container">
          <div className="friend-add-container">
            <button className='menu-buttons' onClick={handleCopyCode}>Copy Code</button>
            <button className='menu-buttons' onClick={handleAddFriendButton}>Add a Friend</button>
          </div>
          <div className='header-title-text'>BOARDLE</div>
          <div className='menu-buttons-container'>
              <button className='menu-buttons' onClick={toggleMenu} >MENU</button>
          </div>
      </div>
    )
  }
}

export default TopBar
