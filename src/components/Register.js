import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register({ setShowRegister }) {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    const restoreUser = async () => {
      const response = await fetch(`${BASE_URL}/restoreUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user : input }) 
      });
      const jsonData = await response.json();

      console.log(JSON.parse(jsonData));

      localStorage.setItem("user", JSON.parse(jsonData).private);
      localStorage.setItem("name", JSON.parse(jsonData).name);
      localStorage.setItem("share", JSON.parse(jsonData).public)

      console.log(localStorage.getItem('user'))
      console.log(localStorage.getItem('name'))
      console.log(localStorage.getItem('share'))
    }
    await restoreUser();
    if(localStorage.getItem('friend-to-add')) {
      handleAddFriend();
      localStorage.removeItem('friend-to-add');
      navigate('/');
    }
    navigate('/');
    window.location.reload();
  }

  const handleRegister = async () => {
    if(!username.includes('@')) {
      alert("Please insert a real email!");
    }
    if(password === '') {
      alert("Please enter a password");
      return;
    }
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: username, unhashed_password: password, private: input })
    })
    const jsonData = await response.json();

    if(JSON.parse(jsonData).error) {
      alert(JSON.parse(jsonData).error)
      return;
    }

    console.log(JSON.parse(jsonData));
    localStorage.setItem("name", JSON.parse(jsonData).name);
    localStorage.setItem("user", JSON.parse(jsonData).private);
    localStorage.setItem("share", JSON.parse(jsonData).share);
    localStorage.setItem("token", JSON.parse(jsonData).token);

    if(localStorage.getItem('friend-to-add')) {
      handleAddFriend();
      localStorage.removeItem('friend-to-add');
      navigate('/');
    }

    setShowRegister(false);

  }

  const handleAddFriend = async () => {
    const response = await fetch(`${BASE_URL}/linkFriends`, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({ user : localStorage.getItem('share'), friend : localStorage.getItem('friend-to-add'), token: localStorage.getItem('token')})
    })
    const data = await response.json();
    console.log("Data is: ", await data.error);
    if(JSON.parse(data).error) {
      alert(JSON.parse(data).error);
    } else {
    }
  }

  async function handleLogin() {
    if(username === '' || password === '') {
      alert('Please enter username and password')
    }
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: username, password: password})
    })
    const jsonData = await response.json();

    if(JSON.parse(jsonData).error) {
      alert(JSON.parse(jsonData).error);
    }
    console.log(JSON.parse(jsonData));
    localStorage.setItem("name", JSON.parse(jsonData).name);
    localStorage.setItem("user", JSON.parse(jsonData).private);
    localStorage.setItem("share", JSON.parse(jsonData).share);
    localStorage.setItem('token', JSON.parse(jsonData).token);

    console.log(localStorage.getItem('share'));

    if(localStorage.getItem('friend-to-add')) {
      handleAddFriend();
      localStorage.removeItem('friend-to-add');
      navigate('/');
    }

    window.location.reload();
  }

  const handleForgotPassword = () => {
    navigate('/reset')
  }


    return (
      <div className='register-card-container'>
          <div className='create-user-container'>
              <h3 className='create-user-text'>Login</h3>
              <input className='create-user-input' onChange={(e) => {
              setUsername(e.target.value)}} placeholder="email" ></input>
              <input className='create-user-input' onChange={(e) => {
              setPassword(e.target.value)}} type="password" placeholder="password" ></input>
              <button className='create-user-button' onClick={handleLogin}>Sign In</button>
              <button className='forgot-password-button' onClick={handleForgotPassword}>Forgot Password?</button>
          </div>
          <div className='create-user-container'>
              <h3 className='create-user-text'>Register with Email</h3>
              <input className='return-user-input' onChange={(e) => {setName(e.target.value)}} placeholder='name'></input>
              <input className='return-user-input' onChange={(e) => {setUsername(e.target.value)}} placeholder='email'></input>
              <input className='return-user-input' type='password' onChange={(e) => {setPassword(e.target.value)}} placeholder='password'></input>
              <p className='create-user-text'>Enter private code below to link account, if you have one.</p>
              <input className='return-user-input' onChange={(e) => {setInput(e.target.value)}} placeholder='private code (optional)'></input>
              <button className='create-user-button' onClick={handleRegister}>Submit</button>
          </div>
          <div className='create-user-container'>
              <h3 className='create-user-text'>Returning User?</h3>
              <h3 className='create-user-text'>Enter private code below!</h3>
              <input className='return-user-input' placeholder="Enter private code here..." onChange={(e) => {
              setInput(e.target.value)}}></input>
              <button className='create-user-button' onClick={handleSubmit}>Submit</button>
          </div>
      </div>
    )
}

export default Register
