import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function Recover() {
    const { code } = useParams();
    const [showReset, setShowReset] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect( () => {
        verify();
    }, [showReset])

    const verify = async () => {
        const response = await fetch(`${BASE_URL}/recoverPassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code : code }) 
          });

          const jsonData = await response.json();

          console.log(jsonData);

          if(jsonData.error) {
            alert(jsonData.error);
          }
          console.log(jsonData);
          localStorage.setItem("name", jsonData.name);
          localStorage.setItem("user", jsonData.private);
          localStorage.setItem("share", jsonData.share);
          localStorage.setItem('token', jsonData.token);

          setShowReset(true);
    }


    const handleSubmit = async () => {
        console.log(localStorage.getItem('token'));
        const response = await fetch(`${BASE_URL}/changePassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ token: localStorage.getItem('token'), password: password})
        })

        const jsonData = await response.json();

          if(jsonData.error) {
            alert(jsonData.error);
          }
          console.log(jsonData);
          navigate('/');
    }

  if(showReset) {
    return(
        <div className='register-card-container'>
          <div className='create-user-container'>
              <h3 className='create-user-text'>New Password</h3>
              <input className='create-user-input' onChange={(e) => {
              setPassword(e.target.value)}} type="password" placeholder="password" ></input>
              <button className='create-user-button' onClick={handleSubmit}>Submit</button>
              </div>
        </div>
    )
  }
  else {
    return(
        <p>LOADING</p>
    )
  }
}

export default Recover