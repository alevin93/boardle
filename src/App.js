import React, {useState, useCallback} from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Menu from './components/Menu'
import Body from './components/Body';
import Register from './components/Register';
import Footer from './components/Footer';

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

  if(localStorage.getItem('user')) {
    return (
    <div className="app-wrapper">
      <TopBar toggleMenu={toggleMenu} />
      <div className={`main-menu-container ${showMenu ? 'show' : ''}`}>
        <Menu />
      </div>
      <div className={`cancel-area-container ${showMenu ? 'show' : ''}`}>
        <button className='cancel-area' onClick={toggleMenu}>BUTTON</button>
    </div>
      <Body />
      <Footer />
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
