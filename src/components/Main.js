import React, {useState, useEffect, useCallback} from 'react';
import TopBar from './TopBar';
import Menu from './Menu'
import Body from './Body';
import Register from './Register';
import Footer from './Footer';
import BoardGames from './BoardGames';
//import AdsComponent from './AdComponent';

function App() {

  const [showMenu, setShowMenu] = useState(false);
  const [showRegister, setShowRegister] = useState(true);
  const [showBoardGames, setShowBoardGames] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('user') || localStorage.getItem('token')) {
      setShowRegister(false);
    }
  }, [showRegister]);

  const toggleMenu = useCallback(() => {
    if(showMenu) {
      setShowMenu(false)
    } 
    else {
      setShowMenu(true);
    }
  })
  const toggleBG = () => {
    if(showBoardGames) {
      setShowBoardGames(false)
    } 
    else {
      setShowBoardGames(true);
    }
  }

  if(!showRegister) {
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
      {/*<AdsComponent /> */}
      <Footer toggleBG={toggleBG} />
    <div className={`bigger-board-game-container ${showBoardGames ? 'show' : ''}`} >
      <BoardGames />
    </div>
    <div className={`cancel-area-container ${showBoardGames ? 'show' : ''}`}>
        <button className='cancel-area' onClick={toggleBG}>BUTTON</button>
    </div>
      
    </div>
    );
  }
  else {
    return (
      <div className="main-container">
        <TopBar toggleMenu={toggleMenu} />
        <Register setShowRegister={setShowRegister}/>
      </div>
    )
  }
}

export default App;
