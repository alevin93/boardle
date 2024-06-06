import React,{ useState } from 'react'
import TopBar from './TopBar';

function Reset() {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit() {
        if(email === '') {
          setMessage("Please enter email!")
        }
        const response = await fetch(`${BASE_URL}/resetPassword`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email: email})
        })
        const jsonData = await response.json();
    
        if(JSON.parse(jsonData).error) {
          alert(JSON.parse(jsonData).error);
        }
        setMessage('Message sent successfully to the provided email')//JSON.parse(jsonData));

      }

  return (
    <>
    <TopBar />
    <div className='register-card-container'>
          <div className='create-user-container'>
              <h3 className='create-user-text'>Reset Password</h3>
              <input className='create-user-input' onChange={(e) => {
              setEmail(e.target.value)}} placeholder="email" ></input>
              <button className='create-user-button' onClick={handleSubmit}>Submit</button>
          </div>
          <h3 className='create-user-text'>{message}</h3>
    </div>
    </>
  )
}

export default Reset