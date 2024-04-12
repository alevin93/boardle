import React, { useEffect, useState } from 'react';
import GameRow from './GameRow';

function Body() {

  const [gamesData, setGamesData] = useState({});
  const [gamesArray, setGamesArray] = useState([]);

  useEffect(() => {
    
    fetchGames();
    sortGames();
    
 // Calling the function within useEffect
  }, []);


  async function fetchGames() {
    try {
      const response = await fetch('http://localhost:4000/getFriendsData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user : localStorage.getItem('user') }) 
      });
  
      const data = await response.json(); 
      console.log(data);
      setGamesData(data);
      return data;
  
    } catch (error) {
      console.error('FUCK FUCK:', error);
      // You might want to return an empty array or a specific error object.
      return []; 
    }
  }

  const sortGames = () => {
    let date = getDate();
    gamesData.forEach(element => {
      if(element[date]) {
        
      }
    });
  }

  function getDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Months are 0-indexed
    if(month < 10) { month = `0${month}`}
    let day = currentDate.getDate();
    let formattedDate = `${year}-${month}-${day}`; 
    return(formattedDate)
  }

  return (
    <div className='main-container'>
      <button className='menu-buttons' onClick={fetchGames}>PRESS THIS BUTTON</button>
      
    </div>
  )
}

export default Body