import React, {useState, useCallback} from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Menu from './components/Menu'
import Input from './components/Input';
import Body from './components/Body';
import Register from './components/Register';

function App() {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    if(showMenu) {
      setShowMenu(false)
    } 
    else {
      setShowMenu(true);
    }
  })

  if(showMenu){
    return (
      <div className="main-container" >
        <TopBar toggleMenu={toggleMenu} />
        <Menu />
      </div>
    );
  }
  else if(localStorage.getItem('user')) {
    return (
    <div className="main-container">
      <TopBar toggleMenu={toggleMenu} />
      <Input />
      <Body />
    </div>
    );
  }
  else {
    return (
      <div className="main-container">
        <TopBar toggleMenu={toggleMenu} />
        <Register />
      </div>
    )
  }
}

export default App;
