import React,{ useState } from 'react'

function Register() {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleCreateUser = async () => {
      const getNewUser = async () => {
        localStorage.setItem("name", name);
          const response = await fetch(`${BASE_URL}/createUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name : name }) 
          });
          const jsonData = await response.json();
          localStorage.setItem("user", jsonData.private);
          localStorage.setItem("share", jsonData.public);
          setRegistered(true);

      }
      await getNewUser();
  }

  const continueRegistration = async () => {
    window.location.reload();
  }

  const handleSubmit = async () => {
    const restoreUser = async () => {
      const response = await fetch(`${BASE_URL}/restoreUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user : input }) 
      });
      const jsonData = await response.json();

      console.log(jsonData);

      localStorage.setItem("user", jsonData.private);
      localStorage.setItem("name", jsonData.name);
      localStorage.setItem("share", jsonData.public)
    }
    await restoreUser();
  }

  if(registered == false){
    return (
      <div className='register-card-container'>
          <div className='create-user-container'>
              <h3 className='create-user-text'>New to Boardle?</h3>
              <input className='create-user-input' onChange={(e) => {
              setName(e.target.value)}} placeholder="Enter name here..." ></input>
              <button className='create-user-button' onClick={handleCreateUser}>Create User</button>
          </div>
          <div className='return-user-container'>
              <h3 className='create-user-text'>Returning User?  Enter private code below!</h3>
              <input className='return-user-input' onChange={(e) => {
              setInput(e.target.value)}}></input>
              <button className='return-user-submit' onClick={handleSubmit}>Submit</button>
          </div>
      </div>
    )
  }
  if(registered == true){
    return (
      <div className='register-card-container'>
        <div className='create-user-container'>
          <h3 className='create-user-text'>Thank you for registering!</h3>
          <h3 className='create-user-text'>The code below is your passkey to gaining your account back if you lose access to this browser, or want to log in on a different device.</h3>
          <h3 className='emphasized-register-text'>DO NOT LOSE IT</h3>
          <h3 className='private-passkey'>{localStorage.getItem("user")}</h3>
          <button className='register-continue-button' onClick={continueRegistration}>Continue when ready</button>
        </div>
      </div>
    )
  }
}

export default Register
