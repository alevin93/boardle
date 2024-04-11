import React from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Input from './components/Input';
import Body from './components/Body';
import Register from './components/Register';

function App() {



  if(localStorage.getItem('user')) {
    return (
    <>
      <TopBar />
      <Input />
      <Body />
    </>
    );
  }
  else {
    return (
      <>
        <TopBar />
        <Register />
      </>
    )
  }
}

export default App;
